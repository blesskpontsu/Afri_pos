import {  DepositBody, DepositDraft, TransferBody, TransferDraft, WithdrawalBody, WithdrawalDraft } from "./types";

export const DepositDraftToDepositBody = (transaction: DepositDraft,  metadata: { code: string }) : DepositBody => {
   
    return {
        phone_number: transaction.phone_number,
        code: metadata.code,
        amount: Number(transaction.amount),
        channel: transaction.channel,
    };
}

export const WithdrawDraftToWithDrawBody = (withdraw: WithdrawalDraft): Omit<WithdrawalBody, "code"> => { 
    return {
       amount : Number(withdraw.amount),
       channel: withdraw.channel,
       phone_number: withdraw.phone_number,
       password: withdraw.password, 
    };
}


