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

  mySRC: string = "";

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }



  playAudio(): void {
    this.http.get('https://fua.apinouroai.ir/api/Audio', { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const audioBlob = new Blob([response], { type: 'audio/mp3' });
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.audioPlayer.nativeElement.src = fileReader.result;
          this.audioPlayer.nativeElement.addEventListener('canplay', () => {
            this.audioPlayer.nativeElement.play().catch(() => {
              alert('Error playing audio:');
            });
          });
        };
        fileReader.readAsDataURL(audioBlob);
      });
  }
}