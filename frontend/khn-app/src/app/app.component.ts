import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  playAudio(): void {
    this.http.get('http://localhost:55872/api/Audio', { responseType: 'blob' })
     .subscribe((response: Blob) => {
        const audioUrl = URL.createObjectURL(response);
        this.audioPlayer.nativeElement.src = audioUrl;
        this.audioPlayer.nativeElement.play();
      });
  }
}