import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {
  isModalOpen: boolean = false;
  searchTerm: string = '';
  filteredProductos: any[] = [];
  productos: any[] = [];
  selectedMonth: number = new Date().getMonth();
  months: { name: string; value: number }[] = [];
  sucursales: any[] = []; // Para almacenar las sucursales con sus nombres e IDs

  constructor(private dataService: DataService, private alertController: AlertController) {
    this.months = [
      { name: 'Enero', value: 0 }, { name: 'Febrero', value: 1 }, { name: 'Marzo', value: 2 },
      { name: 'Abril', value: 3 }, { name: 'Mayo', value: 4 }, { name: 'Junio', value: 5 },
      { name: 'Julio', value: 6 }, { name: 'Agosto', value: 7 }, { name: 'Septiembre', value: 8 },
      { name: 'Octubre', value: 9 }, { name: 'Noviembre', value: 10 }, { name: 'Diciembre', value: 11 },
    ];
  }

  ngOnInit() {
    this.loadProductos();
    this.loadSucursales(); // Cargar sucursales
  }

  loadProductos() {
    this.dataService.getItems().subscribe(data => {
      this.productos = data.map(e => ({
        id: e.payload.doc.id,
        ...e.payload.doc.data() as any
      }));
    });
  }

  loadSucursales() {
    this.dataService.getSucursales().subscribe(data => {
      this.sucursales = data.map(e => ( {
        id: e.payload.doc.id,
        nombre: (e.payload.doc.data() as { nombre: string }).nombre
      }));
    });
  }

  getSucursalNombre(idSucursal: string): string {
    const sucursal = this.sucursales.find(s => s.id === idSucursal);
    return sucursal ? sucursal.nombre : 'Sucursal desconocida';
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async generatePDF() {
    const purchases = await this.dataService.getMonthlyPurchases(this.selectedMonth);

    if (purchases.length === 0) {
      this.showAlert('No hay compras realizadas en el mes seleccionado.');
      return;
    }

    const doc = new jsPDF();
    const purchaseData = purchases.map(purchase => [
      purchase.nombrePersona,
      purchase.numeroTarjeta,
      purchase.rutPersona,
      this.getSucursalNombre(purchase.sucursalEntrega), // Convertir ID a nombre
      `$${purchase.total.toFixed(3)}`, // Asegurarse de que el total tenga 3 decimales
      purchase.fechaCompra.toDate().toLocaleDateString(),
    ]);

    doc.text(`Compras del Mes de ${this.months[this.selectedMonth].name}`, 10, 10);

    autoTable(doc, {
      head: [['Nombre', 'Tarjeta', 'RUT', 'Sucursal', 'Total', 'Fecha']],
      body: purchaseData,
    });

    const monthName = this.months[this.selectedMonth].name;
    doc.save(`Compras_mes_de_${monthName}.pdf`);
  }

  // Método para mostrar alertas
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  resetSearch() {
    this.searchTerm = '';
    this.filteredProductos = [];
  }

  searchProductos() {
    if (this.searchTerm.trim() === '') {
      this.filteredProductos = [];
      return;
    }

    this.filteredProductos = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
