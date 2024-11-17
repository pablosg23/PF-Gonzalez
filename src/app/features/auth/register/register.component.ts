import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from "../../../core/services/users.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
    ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const newUser = {
        ...formValue,
        role: 'USER', // Default role for registered users
      };

      this.usersService.addUser(newUser).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.registrationError = 'Failed to register. Please try again.';
          console.error(err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
