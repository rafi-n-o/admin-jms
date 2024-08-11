import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
    imports: [
        CommonModule,
        CategoryRoutingModule
    ],
    declarations: [CategoryComponent]
})
export class CategoryModule { }
