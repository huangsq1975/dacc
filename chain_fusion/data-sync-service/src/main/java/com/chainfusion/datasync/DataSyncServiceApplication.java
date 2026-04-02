package com.chainfusion.datasync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 鏈上鏈下數據同步服務 + 托管系統服務入口（code.md 三、七）
 */
@SpringBootApplication
@EnableScheduling
public class DataSyncServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataSyncServiceApplication.class, args);
    }
}
