import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Token, Token__factory } from '@contract/index'; 

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contract: Token | null = null;

  constructor() {}

  // Método para conectar ao contrato com um endereço e um provedor
  async connectContract(address: string): Promise<void> {
    if (!(window as any).ethereum) {
      throw new Error("Metamask não está instalado");
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    this.contract = Token__factory.connect(address, signer);
  }

  // Método para obter o saldo de um endereço
  async getBalanceOf(address: string): Promise<string | undefined> {
    if (!this.contract) throw new Error('Contrato não conectado');
    const balance = await this.contract.balanceOf(address);
    return ethers.formatUnits(balance, 18); // Converter o saldo para a unidade do token
  }

  // Método para transferir tokens
  async transfer(to: string, amount: string): Promise<void> {
    if (!this.contract) throw new Error('Contrato não conectado');
    const amountInWei = ethers.parseUnits(amount, 18);
    const tx = await this.contract.transfer(to, amountInWei);
    await tx.wait();
  }
}
