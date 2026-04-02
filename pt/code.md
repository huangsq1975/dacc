**分布式多链融合网关核心模块部分代码**

# **一、网关核心入口（统一接入层）**

// 分布式多链融合网关 \- 统一入口

GatewayCoreService {

    // 1\. 接收所有外部请求：银行/外资行/CIPS/SWIFT/mBridge/香港RTGS

    void receiveRequest(Request request, ChannelType channel) {

        try {

            // 日志 \+ 监控埋点

            MonitorService.recordRequest(channel, request.getMsgId());

            // 基础校验：格式、签名、权限

            validateRequest(request);

            // 报文协议转换（核心）

            StandardMessage standardMsg \= ProtocolConverter.convert(request, channel);

            // 统一合规校验（AML/反洗钱/制裁名单）

            ComplianceService.check(standardMsg);

            // 路由决策：转发到链上 / 链下 / 清算系统

            RouteResult route \= RouterService.selectBestRoute(standardMsg);

            // 执行交易：链上上链 / 链下发往银行系统

            if (route.isOnChain()) {

                BlockchainService.sendToChain(standardMsg);

            } else {

                OffChainService.sendToFinancialInstitution(standardMsg);

            }

            // 双向数据同步

            DataSyncService.syncToChain(standardMsg);

            DataSyncService.syncToOffChain(standardMsg);

            // 上报监管节点

            RegulatorNode.report(standardMsg);

            // 结果返回

            return successResponse(standardMsg);

        } catch (Exception e) {

            // 异常监控 \+ 告警

            MonitorService.alert(e);

            return failResponse(e.getMessage());

        }

    }

}

# 

# **二、报文协议转换器（CIPS / SWIFT /mBridge/ 香港 RTGS → 统一标准报文）**

ProtocolConverter {

    // 统一转换入口

    static StandardMessage convert(Request rawMsg, ChannelType channel) {

        switch (channel) {

            case CIPS:

                return convertFromCIPS(rawMsg);

            case SWIFT:

                return convertFromSWIFT(rawMsg);

            case mBridge:

                return convertFromMBridge(rawMsg);

            case HK\_RTGS:

                return convertFromHKRTGS(rawMsg);

            default:

                throw new UnsupportedProtocolException();

        }

    }

    // \------------------------------

    // 1\. CIPS 报文 → 网关标准报文

    // \------------------------------

    private static StandardMessage convertFromCIPS(CIPSMessage cipsMsg) {

        StandardMessage msg \= new StandardMessage();

        msg.setMsgId(cipsMsg.getInstructionId());

        msg.setPayer(cipsMsg.getDebtorAccount());

        msg.setPayee(cipsMsg.getCreditorAccount());

        msg.setAmount(cipsMsg.getAmount());

        msg.setCurrency(cipsMsg.getCurrency());

        msg.setChannel("CIPS");

        msg.setRawData(cipsMsg.getXmlContent());

        msg.setSignature(cipsMsg.getSignature());

        return msg;

    }

    // \------------------------------

    // 2\. SWIFT MT 报文 → 标准报文

    // \------------------------------

    private static StandardMessage convertFromSWIFT(SWIFTMessage swiftMsg) {

        StandardMessage msg \= new StandardMessage();

        msg.setMsgId(swiftMsg.getField20()); // 交易编号

        msg.setPayer(swiftMsg.getField50K());

        msg.setPayee(swiftMsg.getField59());

        msg.setAmount(swiftMsg.getField32B());

        msg.setCurrency("USD/HKD/EUR");

        msg.setChannel("SWIFT");

        return msg;

    }

    // \------------------------------

    // 3\. mBridge (多边央行数字货币桥)

    // \------------------------------

    private static StandardMessage convertFromMBridge(MBridgeMessage mMsg) {

        StandardMessage msg \= new StandardMessage();

        msg.setMsgId(mMsg.getTxHash());

        msg.setPayer(mMsg.getPayerWallet());

        msg.setPayee(mMsg.getPayeeWallet());

        msg.setAmount(mMsg.getCBDCAmount());

        msg.setCurrency("eCNY/CBDC");

        msg.setChannel("mBridge");

        msg.setOnChain(true);

        return msg;

    }

    // \------------------------------

    // 4\. 香港 RTGS 港元/美元清算系统

    // \------------------------------

    private static StandardMessage convertFromHKRTGS(HKRTGSMessage hkMsg) {

        StandardMessage msg \= new StandardMessage();

        msg.setMsgId(hkMsg.getTxId());

        msg.setPayer(hkMsg.getFromBank() \+ ":" \+ hkMsg.getFromAccount());

        msg.setPayee(hkMsg.getToBank() \+ ":" \+ hkMsg.getToAccount());

        msg.setAmount(hkMsg.getSettlementAmount());

        msg.setCurrency(hkMsg.getCurrency()); // HKD/USD

        msg.setChannel("HK\_RTGS");

        return msg;

    }

    // \------------------------------

    // 反向转换：标准报文 → 各系统原始报文

    // \------------------------------

    static CIPSMessage convertToCIPS(StandardMessage msg) { ... }

    static SWIFTMessage convertToSWIFT(StandardMessage msg) { ... }

    static MBridgeMessage convertToMBridge(StandardMessage msg) { ... }

}

# 

# **三、链上、 链下 双向数据同步（核心）**

DataSyncService {

    // \------------------------------

    // 链下数据 → 上链存证（银行交易 → 区块链）

    // \------------------------------

    void syncToChain(StandardMessage msg) {

        // 1\. 生成哈希（不可篡改）

        String hash \= HashUtil.sha256(msg.getRawData());

        // 2\. 组装上链数据

        ChainData chainData \= new ChainData();

        chainData.setMsgId(msg.getMsgId());

        chainData.setHash(hash);

        chainData.setTimestamp(msg.getTimestamp());

        chainData.setSource(msg.getChannel());

        chainData.setPayer(msg.getPayer());

        chainData.setPayee(msg.getPayee());

        chainData.setAmount(msg.getAmount());

        // 3\. 上链（Conflux / ETH / 联盟链）

        BlockchainClient.write(chainData);

        // 4\. 记录同步日志

        SyncLogService.save("SYNC\_TO\_CHAIN", msg.getMsgId(), hash);

    }

    // \------------------------------

    // 链上数据 → 链下同步（区块链 → 银行/外资行系统）

    // \------------------------------

    void syncToOffChain(StandardMessage msg) {

        // 1\. 从链上获取交易确认信息

        ChainReceipt receipt \= BlockchainClient.getReceipt(msg.getMsgId());

        // 2\. 转换为银行可识别格式

        OffChainData offChainData \= new OffChainData();

        offChainData.setMsgId(msg.getMsgId());

        offChainData.setBlockHash(receipt.getBlockHash());

        offChainData.setStatus(receipt.getStatus());

        offChainData.setConfirmTime(receipt.getBlockTime());

        // 3\. 推送给国内外大小金融机构与外资行核心系统

        BankCoreClient.push(offChainData);

        // 4\. 对账

        ReconciliationService.match(msg.getMsgId(), receipt);

    }

}

# 

# **四、监管节点对接（满足审计、合规、穿透式监管）**

RegulatorNode {

    // 统一上报监管节点

    static void report(StandardMessage msg) {

        RegulatorReport report \= new RegulatorReport();

        report.setMsgId(msg.getMsgId());

        report.setTransactionType(msg.getChannel());

        report.setPayer(msg.getPayer());

        report.setPayee(msg.getPayee());

        report.setAmount(msg.getAmount());

        report.setCurrency(msg.getCurrency());

        report.setHash(msg.getOnChainHash());

        report.setTimestamp(now());

        report.setRawData(msg.getRawData());

        // 上报监管机构（人行/香港金管局/跨境监管节点）

        RegulatorClient.send(report);

        

        // 留痕7年

        AuditLogService.save(report);

    }

    // 监管查询接口（监管可实时查）

    List\<RegulatorReport\> queryByDate(Date start, Date end) {

        return AuditLogService.query(start, end);

    }

}

# 

# **五、数据监控 \+ 异常处理（金融级要求）**

MonitorService {

    // 记录请求量、成功率、延迟

    void recordRequest(ChannelType channel, String msgId) {

        Metrics.counter(channel \+ "\_request\_total").increment();

        Metrics.timer(channel \+ "\_response\_time").record();

    }

    // 实时监控面板数据

    MonitorData getMonitorData() {

        MonitorData data \= new MonitorData();

        data.setTotalTx(getTxCount());

        data.setSuccessRate(getSuccessRate());

        data.setDelayAvg(getAvgDelay());

        data.setCIPSVolume(getCIPSVolume());

        data.setSwiftVolume(getSwiftVolume());

        data.setMBridgeVolume(getMBridgeVolume());

        data.setHKRTGSVolume(getHKRTGSVolume());

        data.setChainSyncStatus(getChainSyncStatus());

        return data;

    }

    // 异常告警

    void alert(Exception e) {

        Metrics.counter("error\_total").increment();

        AlertService.sendSMS("网关异常：" \+ e.getMessage());

        AlertService.sendWeCom("网关异常：" \+ e.getMessage());

        AlertService.sendEmail("网关异常：" \+ e.getMessage());

    }

}

# 

# **六、动态路由（自动选择最优链路：CIPS / SWIFT / 链上）**

RouterService {

    static RouteResult selectBestRoute(StandardMessage msg) {

        RouteResult route \= new RouteResult();

        // 规则1：人民币跨境 → CIPS

        if (msg.getCurrency().equals("CNY") && isCrossBorder()) {

            route.setTarget("CIPS");

            route.setOnChain(false);

        }

        // 规则2：数字货币 → mBridge

        else if (msg.isCBDC()) {

            route.setTarget("mBridge");

            route.setOnChain(true);

        }

        // 规则3：港币/美元跨境 → 香港RTGS

        else if (msg.getCurrency().in("HKD", "USD") && isHKChannel()) {

            route.setTarget("HK\_RTGS");

            route.setOnChain(false);

        }

        // 规则4：国际常规 → SWIFT

        else {

            route.setTarget("SWIFT");

            route.setOnChain(false);

        }

        return route;

    }

}

# 

# **七、托管系统钱包与链上资产同步**

托管钱包资产同步核心逻辑，覆盖：托管钱包余额实时同步、链上资产变动监听、对账校验、异常处理，完全适配需求书中RWA托管钱包、密钥与地址管理场景，与前文部分应用代码无缝衔接。

**7.1 托管系统核心服务（托管钱包+资产同步）**

| java// 托管系统核心服务（对接网关、链上节点、金融机构）CustodySystemService {    // 托管钱包实例（每个金融机构/用户对应独立钱包）    private Map\<String, CustodyWallet\> walletMap \= new ConcurrentHashMap\<\>();        // 1\. 初始化托管钱包（关联金融机构、密钥、链上地址）    void initCustodyWallet(String financialInstitutionId, String walletId, String chainAddress, String keyId) {        // 校验金融机构权限（国内外大小金融机构与外资行）        if (\!FinancialInstitutionService.checkPermission(financialInstitutionId)) {            throw new PermissionDeniedException("无托管权限");        }        // 绑定密钥（HSM硬件存储，关联密钥与地址）        KeyService.bindKeyAndAddress(keyId, chainAddress);        // 创建托管钱包        CustodyWallet wallet \= new CustodyWallet();        wallet.setWalletId(walletId);        wallet.setFinancialInstitutionId(financialInstitutionId);        wallet.setChainAddress(chainAddress);        wallet.setKeyId(keyId);        wallet.setBalance(0.0);        wallet.setSyncStatus(SyncStatus.SYNCED);        // 存入钱包映射        walletMap.put(walletId, wallet);        // 日志记录        CustodyLogService.save("WALLET\_INIT", walletId, financialInstitutionId);    }        // 2\. 托管钱包 ↔ 链上资产实时同步（核心方法）    void syncCustodyWalletWithChain() {        // 1\. 遍历所有托管钱包，批量同步        for (CustodyWallet wallet : walletMap.values()) {            try {                // 标记同步中                wallet.setSyncStatus(SyncStatus.SYNCING);                                // 2\. 从链上查询最新资产余额（支持多链：Conflux/ETH等）                ChainAsset chainAsset \= BlockchainClient.getAssetBalance(wallet.getChainAddress());                                // 3\. 从托管系统查询本地余额                BigDecimal localBalance \= CustodyDB.queryWalletBalance(wallet.getWalletId());                                // 4\. 对账校验（链上与本地余额一致性）                if (checkBalanceConsistency(chainAsset.getBalance(), localBalance)) {                    // 余额一致，更新同步时间                    wallet.setLastSyncTime(LocalDateTime.now());                    wallet.setSyncStatus(SyncStatus.SYNCED);                    // 记录同步日志                    SyncLogService.save("WALLET\_CHAIN\_SYNC", wallet.getWalletId(), "余额一致");                } else {                    // 余额不一致，触发自动对账修复                    reconcileWalletBalance(wallet, chainAsset.getBalance(), localBalance);                    // 同步告警（通知运维+合规）                    MonitorService.alert(new SyncException("托管钱包与链上资产不一致，已自动修复：" \+ wallet.getWalletId()));                }                                // 5\. 同步链上资产变动记录（交易明细、RWA代币流转）                syncChainAssetTransaction(wallet, chainAsset.getTransactionHistory());                            } catch (Exception e) {                // 同步失败，标记异常状态                wallet.setSyncStatus(SyncStatus.SYNC\_FAILED);                // 记录失败日志 \+ 告警                SyncLogService.save("WALLET\_CHAIN\_SYNC\_FAILED", wallet.getWalletId(), e.getMessage());                MonitorService.alert(new SyncException("托管钱包同步失败：" \+ wallet.getWalletId() \+ "，原因：" \+ e.getMessage()));            }        }    }        // 3\. 余额一致性校验（允许微小误差，金融级精度）    private boolean checkBalanceConsistency(BigDecimal chainBalance, BigDecimal localBalance) {        // 误差阈值：0.0001（适配数字货币、RWA代币精度）        BigDecimal threshold \= new BigDecimal("0.0001");        return chainBalance.subtract(localBalance).abs().compareTo(threshold) \<= 0;    }        // 4\. 余额对账修复（以链上数据为基准，确保资产安全）    private void reconcileWalletBalance(CustodyWallet wallet, BigDecimal chainBalance, BigDecimal localBalance) {        // 1\. 记录对账前状态        CustodyLogService.save("WALLET\_RECONCILE\_BEFORE", wallet.getWalletId(),             "链上余额：" \+ chainBalance \+ "，本地余额：" \+ localBalance);                // 2\. 以链上余额为基准，更新本地托管余额        CustodyDB.updateWalletBalance(wallet.getWalletId(), chainBalance);        wallet.setBalance(chainBalance);                // 3\. 记录对账后状态        CustodyLogService.save("WALLET\_RECONCILE\_AFTER", wallet.getWalletId(),             "修复后余额：" \+ chainBalance);                // 4\. 同步至金融机构系统（告知余额调整）        FinancialInstitutionClient.pushWalletBalance(wallet.getFinancialInstitutionId(), wallet.getWalletId(), chainBalance);    }        // 5\. 同步链上资产变动记录（交易明细、RWA代币流转）    private void syncChainAssetTransaction(CustodyWallet wallet, List\<ChainTransaction\> transactions) {        // 过滤未同步的交易        List\<ChainTransaction\> unsyncedTx \= transactions.stream()            .filter(tx \-\> \!CustodyDB.isTransactionSynced(tx.getTxHash()))            .collect(Collectors.toList());                if (\!unsyncedTx.isEmpty()) {            // 批量同步至托管系统数据库            CustodyDB.batchSaveTransaction(unsyncedTx, wallet.getWalletId());            // 同步至金融机构交易明细            FinancialInstitutionClient.pushTransaction明细(wallet.getFinancialInstitutionId(), unsyncedTx);            // 记录同步日志            SyncLogService.save("WALLET\_TRANSACTION\_SYNC", wallet.getWalletId(), "同步交易数：" \+ unsyncedTx.size());        }    }        // 6\. 托管钱包资产查询（供金融机构、网关调用）    CustodyWalletQueryResult queryWalletAsset(String walletId) {        CustodyWallet wallet \= walletMap.get(walletId);        if (wallet \== null) {            throw new WalletNotFoundException("托管钱包不存在：" \+ walletId);        }        // 实时查询链上最新余额（确保查询结果准确）        ChainAsset chainAsset \= BlockchainClient.getAssetBalance(wallet.getChainAddress());        // 组装查询结果（包含余额、同步状态、交易明细）        CustodyWalletQueryResult result \= new CustodyWalletQueryResult();        result.setWalletId(walletId);        result.setFinancialInstitutionId(wallet.getFinancialInstitutionId());        result.setChainAddress(wallet.getChainAddress());        result.setCurrentBalance(chainAsset.getBalance());        result.setSyncStatus(wallet.getSyncStatus());        result.setLastSyncTime(wallet.getLastSyncTime());        result.setRecentTransactions(chainAsset.getTransactionHistory().subList(0, Math.min(10, chainAsset.getTransactionHistory().size())));        return result;    }}// 托管钱包实体类class CustodyWallet {    private String walletId;          // 托管钱包ID    private String financialInstitutionId; // 所属金融机构ID    private String chainAddress;     // 链上地址    private String keyId;            // 关联密钥ID    private BigDecimal balance;      // 本地托管余额    private SyncStatus syncStatus;   // 同步状态（SYNCED/SYNCING/SYNC\_FAILED）    private LocalDateTime lastSyncTime; // 最后同步时间    // getter/setter}// 同步状态枚举enum SyncStatus {    SYNCED,     // 同步完成    SYNCING,    // 同步中    SYNC\_FAILED // 同步失败} |
| :---- |

**7.2 关联衔接（与前文部分应用代码联动）**

在DataSyncService（链上↔链下同步）中新增托管钱包同步触发逻辑，确保网关交易完成后，托管钱包与链上资产实时同步：

| java// 补充DataSyncService，新增托管钱包同步触发DataSyncService {    // 原有方法不变...        // 补充：链上数据同步至托管系统（触发托管钱包更新）    void syncToCustodySystem(StandardMessage msg) {        // 1\. 获取交易关联的托管钱包ID（从交易报文中提取）        String walletId \= msg.getExtension().get("walletId");        if (StringUtils.isEmpty(walletId)) {            return; // 非托管交易，跳过        }        // 2\. 触发托管系统同步该钱包资产        CustodySystemService.syncCustodyWalletWithChainByWalletId(walletId);        // 3\. 记录同步日志        SyncLogService.save("SYNC\_TO\_CUSTODY", msg.getMsgId(), walletId);    }        // 重载：单独同步指定托管钱包    void syncCustodyWalletWithChainByWalletId(String walletId) {        CustodyWallet wallet \= CustodySystemService.getWalletById(walletId);        if (wallet \!= null) {            // 执行单钱包同步（复用前文批量同步逻辑）            syncSingleWallet(wallet);        }    }} |
| :---- |

