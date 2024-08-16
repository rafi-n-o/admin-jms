import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'category',
                loadChildren: () =>
                    import('./category/category.module').then(
                        (m) => m.CategoryModule
                    ),
            },
            {
                path: 'product',
                loadChildren: () =>
                    import('./product/product.module').then(
                        (m) => m.ProductModule
                    ),
            },
            {
                path: 'item',
                loadChildren: () =>
                    import('./item/item.module').then((m) => m.ItemModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class JewelryRoutingModule {}
