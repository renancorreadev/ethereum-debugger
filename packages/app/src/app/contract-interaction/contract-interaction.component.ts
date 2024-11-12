import { Component } from '@angular/core';
import { ContractService } from '@/app/services/contract.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'contract-interaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contract-interaction.component.html',
})
export class ContractInteractionComponent {
  walletAddress: string = '';
  amount: string = '';
  balance: string | undefined;

  constructor(private contractService:  ContractService) {}

  async connectToContract() {
    await this.contractService.connectContract('0xYourContractAddress');
  }

  async getBalance() {
    if (!this.walletAddress) {
      console.error('Endereço de carteira é obrigatório');
      return;
    }
    this.balance = await this.contractService.getBalanceOf(this.walletAddress);
  }

  async transferTokens() {
    if (!this.walletAddress || !this.amount) {
      console.error('Endereço e valor são obrigatórios');
      return;
    }
    await this.contractService.transfer(this.walletAddress, this.amount);
  }
}
