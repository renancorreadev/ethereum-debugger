import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ethers } from 'ethers';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public walletConnected: boolean = false;
  public userAddress: string = '';

  async connectWallet(): Promise<void> {
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          this.walletConnected = true;
          this.userAddress = accounts[0];
        }
      } catch (error) {
        console.error("Erro ao conectar com a wallet", error);
      }
    } else {
      alert("Metamask não está instalado. Por favor, instale-o para continuar.");
    }
  }
}
