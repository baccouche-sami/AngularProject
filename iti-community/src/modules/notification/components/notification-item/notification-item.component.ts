import { AnyNotification, NotifInfo } from './../../notification.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.less']
})
export class NotificationItemComponent implements OnInit {
  @Input()
  notif: AnyNotification;
  notifInfo: NotifInfo;
  constructor() {
    this.notifInfo = this.getNotifInfo(this.notif)
   }

  ngOnInit(): void {
    this.notifInfo = this.getNotifInfo(this.notif)
    //console.log(this.notif);
    
    
    
    
  }

  getNotifInfo(notif:AnyNotification):NotifInfo{
    
    let data:NotifInfo = {
      subject: "",
      message: "",
      photoUser: "",
      link: ""
    }
    if (this.notif) {
      switch (this.notif.subject) {
        case 'room_added':
          data.subject = 'Room Added'
          data.message = 'A Room was added by '+this.notif.payload.user.username
          data.photoUser=this.notif.payload.user.photoUrl
          data.link = "room" in this.notif.payload ? this.notif.payload.room.id : "#"
          return data;
        case 'post_liked':
          data.subject = 'Post Liked'
          data.message = 'Your post was liked by '+this.notif.payload.user.username
          data.photoUser=this.notif.payload.user.photoUrl
          data.link = "postId" in this.notif.payload ? this.notif.payload.postId : "#"
          return data;
        case 'new_user':
          data.subject = 'Room Added'
          data.message = 'A Room was added by '+this.notif.payload.user.username
          data.photoUser=this.notif.payload.user.photoUrl
          data.link = this.notif.payload.user.id
          return data;
      
        default:
          data.subject = 'No Subject Found'
          data.message = 'No message'
          data.photoUser= '#'
          return data;
          
      } 
    } 
    return data
  }

}
