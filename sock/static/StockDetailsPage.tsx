import {computed, defineComponent, onActivated, onDeactivated, ref, onBeforeMount, onUnmounted, getCurrentInstance, watch, type VNodeChild, shallowRef} from 'vue';
import Layout from '@/components/layout/Layout';
import IndividualShareData from "./stockData/IndividualShareData";
import StockFiveDetail from "./stockFiveDetail/StockFiveDetail";
import type {Hq, HqStatus} from './StockDetailsPageType'
// import Footer from '@/views/stockDetails/stockFooter/StockFooter.tsx';
import StockName from './stockName/StockName'
import {useRoute} from "vue-router";
// import {parseKeyValueString} from '@/utils/parserWsData'
import {StatusMap} from './StatusMap'
import styles from './stockDetails.module.scss'
import StockInfo from './stockInfo/StockInfo'
import Hushen from "./hushen/HuShen";
import Search from './imgs/search.svg?inline';
import NotAdd from './imgs/not_add.svg?inline';
import Back from './imgs/back.svg?inline';

export default defineComponent({
  name: 'StockDetails',
  setup() {
    const { $http } = getCurrentInstance()!.appContext.config.globalProperties
    const route = useRoute();
    // const isSelted = ref(false);
    // const openTrade = ref(true);
    const symbol = ref('')
    const normalizeSymbol = (raw?: string) => {
      const code = (raw || '').trim().toLowerCase();
      if (!code) return '';
      if (code.startsWith('sh') || code.startsWith('sz')) return code;
      if (/^6\d{5}$/.test(code) || /^(11|50|51)\d{4}$/.test(code)) return `sh${code}`;
      if (/^\d{6}$/.test(code)) return `sz${code}`;
      return code;
    };
    const everyIndex = computed(() => {
      if (symbol.value.startsWith('sh000') || symbol.value.startsWith('sz399')) {
        return 'HuShen';
      }
      return 'IndividualShare';
    });
    watch(
      () => symbol.value,
      (val) => {
        if (val.startsWith('sh000') || val.startsWith('sz399')) {
          footers.value = footers.value.filter(item => item.id !== 2);
        }
      },
      { immediate: true }
    );

    const footers = ref([
      { name: '模拟交易', id: 1, page: 'P017001', action: 'B017007' },
      { name: '分时宝', id: 2, page: 'P017001', action: 'B017019' },
      { name: '加自选', id: 4, page: 'P017001', action: 'B017008' }
    ]);

    // const handleToNewPage = (item: any) => {
    //   console.log('非小程序环境点击：', item);
    //   // 在这里实现 toNewPage 的逻辑
    //   // 例如：router.push(...)
    // };

    // const handleShowHcTrade = () => {
    //   console.log('点击了交易按钮');
    //   // 在这里实现 showHcTrade 的逻辑
    //   // 例如：显示底部弹窗
    // };

    const ZJCJ = computed(() => {
      if (stockInfo_detail.value.length > 0) {
        //注意：最新价==0 &成交量==0时，应该取最新价的时候，最新价取昨收价
        let currentPrice = stockInfo_detail.value[3];
        let cjl = stockInfo_detail.value[8];
        if (parseFloat(currentPrice) == 0 && parseFloat(cjl) == 0) {
          currentPrice = stockInfo_detail.value[2];
        }
        return parseFloat(currentPrice).toFixed(2);
      }
      return '--'
    })

    const ZS = computed(() => {
      if (stockInfo_detail.value.length>0 ) {
        return parseFloat(stockInfo_detail.value[2]).toFixed(2)
      }
      return '--'
    });

    const ZDE = computed(() => {
      if (ZJCJ.value != '--' && stockInfo_detail.value.length > 0) {
        let r = ((ZJCJ.value as unknown) as number - parseFloat(stockInfo_detail.value[2])).toFixed(2);
        return parseFloat(r) > 0 ? "+" + r : r;
      }
      return '--'
    });

    const ZDF = computed(() => {
      if (ZDE.value != '--' && stockInfo_base.value.length > 0 && stockInfo_detail.value.length > 0) {
        if (parseFloat(stockInfo_base.value[15]) == 1 && stockInfo_detail.value[32] != "00") {
          return StatusMap[stockInfo_detail.value[32] as keyof typeof StatusMap];
        }
        const r = (
          (parseFloat(ZDE.value) / parseFloat(stockInfo_detail.value[2])) *
          100
        ).toFixed(2);

        return parseFloat(r) > 0 ? `+${r}%` : `${r}%`;
      }
      return '--'
    });

    const hq = ref<Hq>({
      rzrq: 0,
      gst: 0,
      ght: 0,
      sgt: 0,
      wai_pan: '',
      nei_pan: ''
    });
    const hq_status = ref<HqStatus>({
      msg: ''
    });
    const stockInfo_base = ref<any[]>([]);
    const stockInfo_detail = ref<any[]>([]);
    // const _ws = ref<any>(null);
    const isFirst = ref(true);
    const titleCom = shallowRef<VNodeChild>('');
    // const connectWebSocket = () => {
    //   if (_ws.value) {
    //     _ws.value.close();
    //   }
    //   const url = import.meta.env.MODE === 'development'
    //     ? 'ws://localhost:8888/ws/wskt'
    //     : 'http://web-test.qcoral.tech/ws/wskt';
    //   const ws = new WebSocket(`${url}?list=${symbol.value},${symbol.value}_i`);
    //   ws.onmessage = (event) => {
    //     const message = event.data as string;
    //     const data = parseKeyValueString(message);
    //
    //     if (data[`${symbol.value}_i`]) {
    //       stockInfo_base.value = data[`${symbol.value}_i`].split(",");
    //     }
    //     if (data[symbol.value]) {
    //       stockInfo_detail.value = data[symbol.value].split(",");
    //     }
    //
    //     if (isFirst.value && stockInfo_detail.value.length > 0) {
    //       document.title = `${stockInfo_detail.value[0]}(${symbol.value.toLocaleUpperCase()})`;
    //       route.meta.title = `${stockInfo_detail.value[0]}(${symbol.value.toLocaleUpperCase()})`;
    //       titleCom.value = (
    //         <div class={styles.header}>
    //           <div class={styles.left}>
    //             <img src={Back}/>
    //           </div>
    //           <div class={styles.title}>
    //             <div class={styles.main}>{stockInfo_detail.value[0]}</div>
    //             <div class={styles.sub}>{symbol.value.toLocaleUpperCase()}</div>
    //           </div>
    //           <div class={styles.right}>
    //             <img src={Search} class={styles.search} />
    //             <img src={NotAdd} />
    //           </div>
    //         </div>
    //       );
    //       isFirst.value = false;
    //     }
    //   };
    //   _ws.value = ws;
    // };

    const pollInterval = ref<number | null>(null);
    const chartRefreshTs = ref(Date.now());

    const startPolling = () => {
      if (pollInterval.value) return; // 防止重复启动

      const fetchData = async () => {
        if (!symbol.value) return;

        try {
          const url = '/ws/wskt';

          return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            const callbackName = `w${Date.now()}_${Math.random().toString(36).slice(2)}`;
            const timeoutId = setTimeout(() => {
              reject(new Error('JSONP timeout'));
              cleanup();
            }, 10000);

            const cleanup = () => {
              clearTimeout(timeoutId);
              if (script.parentNode) script.parentNode.removeChild(script);
              // @ts-ignore
              if (window[callbackName]) delete window[callbackName];
            };

            // @ts-ignore
            window[callbackName] = () => {
              cleanup();
              resolve();
            };

            script.src = `${url}?list=${symbol.value},${symbol.value}_i`;
            script.onerror = () => {
              cleanup();
              reject(new Error('JSONP load error'));
            };
            document.head.appendChild(script);

            setTimeout(() => {
              try {
                const hqStrMain = (window as any)[`hq_str_${symbol.value}`];
                const hqStrBase = (window as any)[`hq_str_${symbol.value}_i`];

                const Record: Record<string, string> = {};
                if (hqStrMain !== undefined) {
                  Record[symbol.value] = hqStrMain;
                }
                if (hqStrBase !== undefined) {
                  Record[`${symbol.value}_i`] = hqStrBase;
                }

                // delete (window as any)[`hq_str_${symbol.value}`];
                // delete (window as any)[`hq_str_${symbol.value}_i`];

                if (Record[symbol.value]) {
                  stockInfo_detail.value = Record[symbol.value].split(',');
                }
                if (Record[`${symbol.value}_i`]) {
                  stockInfo_base.value = Record[`${symbol.value}_i`].split(',');
                }

                // 每次輪詢拿到行情後，刷新分時圖 iframe，確保圖表使用最新數據
                chartRefreshTs.value = Date.now();

                if (isFirst.value && stockInfo_detail.value.length > 0) {
                  document.title = `${stockInfo_detail.value[0]}(${symbol.value.toLocaleUpperCase()})`;
                  route.meta.title = `${stockInfo_detail.value[0]}(${symbol.value.toLocaleUpperCase()})`;
                  titleCom.value = (
                    <div class={styles.header}>
                      <div class={styles.left}>
                        <img src={Back}/>
                      </div>
                      <div class={styles.title}>
                        <div class={styles.main}>{stockInfo_detail.value[0]}</div>
                        <div class={styles.sub}>{symbol.value.toLocaleUpperCase()}</div>
                      </div>
                      <div class={styles.right}>
                        <img src={Search} class={styles.search} />
                        <img src={NotAdd} />
                      </div>
                    </div>
                  );
                  isFirst.value = false;
                }
              } catch (e) {
                console.error('Parse HQ data error:', e);
              }
              cleanup();
              resolve();
            }, 100); // 确保 script 执行完成
          });
        } catch (error) {
          console.error('Polling error:', error);
        }
      };

      // 立即执行一次
      fetchData();
      // 每 3 秒轮询一次（可根据需求调整）
      pollInterval.value = window.setInterval(fetchData, 3000);
    };

    const stopPolling = () => {
      if (pollInterval.value) {
        clearInterval(pollInterval.value);
        pollInterval.value = null;
      }
    };

    const hqChartUrl = computed(() => {
      const stockhqChart = '/stock-details';
      if (!symbol.value) { return ''}
      return `${stockhqChart}?symbol=${symbol.value}&mode=minute&_t=${chartRefreshTs.value}`;
    });

    const lunxun = ref(0);
    const getHqDataIndex = () => {
      $http.request({
        port: "WK_Init.getHqDataIndex",
        data: {
          default: 0,
          market: "cn",
          symbol: symbol.value,
          hq_status: 1,
          pan: 1,
          attr: 1,
          zdp: 1,
          free_amount: 1
        }
        // @ts-ignore
      })?.then(({code, data}) => {
        if (code === 0) {
          hq_status.value = data.hq_status;
          hq.value = data.hq;
        }
      });
    }
    onBeforeMount(() => {
      symbol.value = normalizeSymbol(useRoute().query.symbol as string);
    })
    onActivated(() => {
      startPolling();
      getHqDataIndex();
      if(symbol.value){
        lunxun.value = setInterval(() => {
          getHqDataIndex();
        }, 6000);
      }
    })
    onDeactivated(() => {
      stopPolling();
      isFirst.value = true;
      clearInterval(lunxun.value);
    })

    onUnmounted(() => {
      stopPolling();
      clearInterval(lunxun.value);
    })

    return () => (
      <Layout
        title={titleCom.value}
      >
        {{
          header: () => null,
          content: () => (
            <>
              <StockName
                ZJCJ={ZJCJ.value}
                ZS={ZS.value}
                ZDE={ZDE.value}
                ZDF={ZDF.value}
                hq={hq.value}
                hq_status={hq_status.value}
                stockInfo_detail={stockInfo_detail.value}
              />

              {
                everyIndex.value === 'IndividualShare' ? (
                  <>
                    <IndividualShareData
                      hq={hq.value}
                      stockInfoBase={stockInfo_base.value}
                      stockInfoDetail={stockInfo_detail.value}
                    />

                    {hqChartUrl.value ? <iframe key={chartRefreshTs.value} src={hqChartUrl.value} class={styles.iframe} frameborder="0"></iframe> : null}

                    <StockFiveDetail
                      symbol={symbol.value}
                      ZS={ZS.value}
                      stockInfo_detail={stockInfo_detail.value}
                    />

                    <StockInfo
                      symbol={symbol.value}
                    />
                  </>
                ) : (
                  <Hushen
                    symbol={symbol.value}
                    hq={hq.value}
                    stockInfo_detail={stockInfo_detail.value}
                  />
                )
              }
            </>
          ),
          // footer: () => (
          //   <Footer
          //     footers={footers.value}
          //     isSelted={isSelted.value}
          //     openTrade={openTrade.value}
          //     everyIndex={everyIndex.value}
          //     onToNewPage={handleToNewPage}
          //     onShowHcTrade={handleShowHcTrade}
          //   />
          // )
        }}
      </Layout>
    );
  },
});
