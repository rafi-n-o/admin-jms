import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        ToolbarModule,
        TableModule,
        ButtonModule,
        PaginatorModule,
        DialogModule,
        FormsModule,
        InputTextModule,
    ],
    declarations: [ProductComponent],
})
export class ProductModule {}
