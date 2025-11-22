import { Injectable } from '@nestjs/common';
import { AccountType, CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

export interface Account {
  userId: string;
  accountName: string;
  balance: number;
  accountType: AccountType;
}

@Injectable()
export class AccountsService {
  private accounts: Account[] = [
    {
      userId: '1',
      accountName: 'Primary Savings',
      balance: 1000000,
      accountType: AccountType.SAVINGS,
    },
    {
      userId: '2',
      accountName: 'Education Fund',
      balance: 5000000,
      accountType: AccountType.SAVINGS,
    },
  ];

  create(dto: CreateAccountDto): Account {
    const existing = this.findByUserId(dto.userId);
    if (existing) {
      return existing;
    }
    const account: Account = { ...dto };
    this.accounts.push(account);
    return account;
  }

  findAll(userId?: string): Account[] {
    return userId
      ? this.accounts.filter((a) => a.userId === userId)
      : this.accounts;
  }

  findByUserId(userId: string): Account | undefined {
    return this.accounts.find((a) => a.userId === userId);
  }

  updateByUserId(userId: string, dto: UpdateAccountDto): Account | undefined {
    const idx = this.accounts.findIndex((a) => a.userId === userId);
    if (idx === -1) return undefined;
    const prev = this.accounts[idx];
    const updated: Account = { ...prev, ...dto };
    this.accounts[idx] = updated;
    return updated;
  }

  removeByUserId(userId: string): boolean {
    const before = this.accounts.length;
    this.accounts = this.accounts.filter((a) => a.userId !== userId);
    return this.accounts.length < before;
  }

  // no id generation required when using userId as the identifier
}
