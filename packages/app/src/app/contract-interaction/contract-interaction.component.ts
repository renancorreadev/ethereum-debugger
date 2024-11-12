import { Component } from '@angular/core';
import { ContractService } from '@/app/services/contract.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '@/config/environments';

@Component({
  selector: 'contract-interaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contract-interaction.component.html',
})
export class ContractInteractionComponent {
  walletAddress: string = '';
  recipientAddress: string = '';  // Novo campo para endereço do destinatário
  amount: string = '';
  balance: string | undefined;

  constructor(private contractService: ContractService) {}

  async connectToContract() {
    await this.contractService.connectContract(environment.contractAddress);
  }

  async getBalance() {
    if (!this.walletAddress) {
      console.error('Endereço de carteira é obrigatório');
      return;
    }
    this.balance = await this.contractService.getBalanceOf(this.walletAddress);
  }

  async transferTokens() {
    if (!this.recipientAddress || !this.amount) {  // Verifica o endereço do destinatário
      console.error('Endereço do destinatário e valor são obrigatórios');
      return;
    }
    await this.contractService.transfer(this.recipientAddress, this.amount);  // Usa o recipientAddress para a transferência
  }
}
