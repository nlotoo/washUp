import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider'; 
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    exports: [
        MatSliderModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
    ],
    imports: [
        MatSliderModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
    ]
})

export class MaterialModule { }