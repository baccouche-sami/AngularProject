import { NotifInfo } from './../../notification.model';
import { NotificationStore } from './../../notification.store';
import { NotificationState } from './../../notification.state';
import { Component, OnInit } from '@angular/core';
import { AnyNotification } from '../../notification.model';
import { NotificationService } from '../../services/notification.service';
import { NotificationQueries } from '../../services/notification.queries';
import { NotificationSocketService } from '../../services/notification.socket.service';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

  isVisible: boolean = false;

  notifications: AnyNotification[]
  notifications$: Observable<AnyNotification[]>;
  dataToShow: NotifInfo

  constructor(private notificationService: NotificationService, private notificatStore: NotificationStore,private notificationSocketService:NotificationSocketService, private notification: NzNotificationService) {
    this.notifications$ = this.notificatStore.get(s=>s.notifications)
   }

  async ngOnInit() {
    this.notificationSocketService.onNewNotification(async notif => {
      console.log(notif)
      this.notificatStore.appendNotification(notif)
      this.dataToShow = this.getNotifInfo(notif)
      this.notification.create(
        'info',
        this.dataToShow.subject,
        this.dataToShow.message
      );
    })
    await this.notificationService.fetch()  
  }

  
    open(event:Event) {
      this.isVisible = false;
      console.log(event);
      
      console.log("Here");
      
    }

    onCancel() {
      this.close();
    }

    close() {
      this.isVisible = false;
    }

    getNotifInfo(notif:AnyNotification):NotifInfo{
    
      let data:NotifInfo = {
        subject: "",
        message: "",
        photoUser: "",
        link: ""
      }
      if (notif) {
        switch (notif.subject) {
          case 'room_added':
            data.subject = 'Room Added'
            data.message = 'A Room was added by '+notif.payload.user.username
            data.photoUser=notif.payload.user.photoUrl
            data.link = "room" in notif.payload ? notif.payload.room.id : "#"
            return data;
          case 'post_liked':
            data.subject = 'Post Liked'
            data.message = 'Your post was liked by '+notif.payload.user.username
            data.photoUser= notif.payload.user.photoUrl
            data.link = "postId" in notif.payload ? notif.payload.postId : "#"
            return data;
          case 'new_user':
            data.subject = 'Room Added'
            data.message = 'A Room was added by '+ notif.payload.user.username
            data.photoUser= notif.payload.user.photoUrl
            data.link = notif.payload.user.id
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
