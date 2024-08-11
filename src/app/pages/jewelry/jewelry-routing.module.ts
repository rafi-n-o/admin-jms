import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'category', component: CategoryComponent },
        { path: 'product', component: ProductComponent }
    ])],
    exports: [RouterModule]
})
export class JewelryRoutingModule { }
