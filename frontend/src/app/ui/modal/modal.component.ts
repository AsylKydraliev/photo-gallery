import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }
}
