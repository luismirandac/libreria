import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo2/catalogo2',
    pathMatch: 'full'
  },
  { path: 'detalle-producto/:id', loadChildren: () => import('./detalle-producto/detalle-producto.module').then(m => m.DetalleProductoPageModule) 
  }
  ,
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
  ,
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(x => x.LoginPageModule)

  },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then(x => x.CatalogoPageModule)

  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import('./administracion/administracion.module').then( m => m.AdministracionPageModule)
  },
  {
    path: 'product-add',
    loadChildren: () => import('./producto/product-add/product-add.module').then( m => m.ProductAddPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./producto/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'product-all',
    loadChildren: () => import('./producto/product-all/product-all.module').then( m => m.ProductAllPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./producto/product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'product-edit/:id',
    loadChildren: () => import('./producto/product-edit/product-edit.module').then( m => m.ProductEditPageModule)
  },
  {
    path: 'comprar',
    loadChildren: () => import('./comprar/comprar.module').then( m => m.ComprarPageModule)
  },
  {
    path: 'carrito2',
    loadChildren: () => import('./carrito2/carrito2.module').then( m => m.Carrito2PageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'oferta',
    loadChildren: () => import('./oferta/oferta.module').then( m => m.OfertaPageModule)
  },
  {
    path: 'catalogo2',
    loadChildren: () => import('./catalogo2/catalogo2.module').then( m => m.Catalogo2PageModule)
  },
  {
    path: 'mapita',
    loadChildren: () => import('./mapita/mapita.module').then( m => m.MapitaPageModule)
  },
  {
    path: 'sucursal-add',
    loadChildren: () => import('./sucursal-add/sucursal-add.module').then( m => m.SucursalAddPageModule)
  },
  {
    path: 'sucursal-edit/:id',
    loadChildren: () => import('./sucursal-edit/sucursal-edit.module').then( m => m.SucursalEditPageModule)
  },
  {
    path: 'empleado-add',
    loadChildren: () => import('./empleado-add/empleado-add.module').then( m => m.EmpleadoAddPageModule)
  },
  {
    path: 'empleado-edit/:id',
    loadChildren: () => import('./empleado-edit/empleado-edit.module').then( m => m.EmpleadoEditPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
  },
 
  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
