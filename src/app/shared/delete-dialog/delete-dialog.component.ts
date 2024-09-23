import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.sass',
})
export class DeleteDialogComponent {
  data = inject(DIALOG_DATA);
  private deletDialogRef = inject(DialogRef<DeleteDialogComponent>);

  constructor() {}

  onDeleteConfirm() {
    this.deletDialogRef.close();  // Emit confirmation
  }

  onCancel(): void {
    this.deletDialogRef.close();  // Emit cancellation
  }
}
