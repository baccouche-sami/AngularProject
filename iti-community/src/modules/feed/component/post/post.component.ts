import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DateTime } from 'luxon';
import { element } from 'protractor';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;
  
  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  linkList : String[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    
    this.divideMessage();
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    this.postService.like(this.post);
  }

  divideMessage() {
    
    const fileRegex = /http[s]?:\/\/\S+?\.(?:jpeg|jpg|png|gif|mp4|wmv|flv|avi|wav|mp3|ogg|wav)/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    
    const usernameRegex = /@[A-Za-z0-9_]\w+/gmi


    let youtubeList = this.post.message.text.content.match(youtubeRegex);
    let fileList = this.post.message.text.content.match(fileRegex);
    let userNameList = this.post.message.text.content.match(usernameRegex);
    
    this.post.message.text.content = this.post.message.text.content.replace(fileRegex, '');
    this.post.message.text.content = this.post.message.text.content.replace(youtubeRegex, '');

    userNameList?.forEach(element => {
      let replacement = "<b class='post-text-username'> "+element+" </b>"
      this.post.message.text.content = this.post.message.text.content.replace(usernameRegex, replacement)
    });

    this.linkList = [...youtubeList??[], ...fileList??[]];

    return null;
  }
}
