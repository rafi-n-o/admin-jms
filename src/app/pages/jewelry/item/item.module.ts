import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PickListModule } from 'primeng/picklist';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        ItemRoutingModule,
        ToolbarModule,
        TableModule,
        ButtonModule,
        PaginatorModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        PickListModule,
        FormsModule,
        InputNumberModule,
        DropdownModule,
    ],
    declarations: [ItemComponent],
})
export class ItemModule {}
