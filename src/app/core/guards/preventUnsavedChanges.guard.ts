import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../../components/members/member-edit/member-edit.component';
import Swal from 'sweetalert2';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = async (component) => {
  if (component.editForm?.dirty) {
    const result = await Swal.fire({
      title: 'Unsaved Changes',
      text: 'Are you sure you want to leave? Any unsaved changes will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, leave',
      cancelButtonText: 'No, stay'
    });

    return result.isConfirmed;
  }
  return true;
};
