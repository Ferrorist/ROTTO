package com.rezero.rotto.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AccountWithdrawalRequest {
    private String transactionBalance;
}