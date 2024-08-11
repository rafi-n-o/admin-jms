import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html' // Optional: include if you have styles
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;

    @Output() pageChange = new EventEmitter<number>();

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.pageChange.emit(this.currentPage);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.pageChange.emit(this.currentPage);
        }
    }
}
