import { NotificationStore } from './../../notification.store';
import { NotificationState } from './../../notification.state';
import { Notification } from './../../../../../../iti-community-server/src/modules/notification/domain/Notification';
import { Component, OnInit } from '@angular/core';
import { AnyNotification } from '../../notification.model';
import { RoomType } from '../../../room/room.model';
import { NotificationService } from '../../services/notification.service';
import { NotificationQueries } from '../../services/notification.queries';
import { NotificationSocketService } from '../../services/notification.socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

  isVisible: boolean = false;

  notifications: AnyNotification[]

  constructor(private notificationService: NotificationService, private notificatStore: NotificationStore,private notificationSocketService:NotificationSocketService) { }

  async webNotification(notification : AnyNotification) {
    let subject = notification.subject;
    let username = notification.payload.user.username;

    Notification.requestPermission().then(function(result) {
      let img  = ''
      let message = ''
      if (subject = "post_liked") {
        img = 'https://image.shutterstock.com/image-vector/counter-notification-icon-social-media-260nw-1340641793.jpg'
        message = 'Your post has been liked'
      } else if (subject = "new_user") {
        img = 'https://cdn3.iconfinder.com/data/icons/basicolor-essentials/24/055_add_new_user-512.png'
        message = "There is a new user in the commun'iti !"
      } else {
        img = 'https://image.shutterstock.com/image-vector/add-users-icon-group-people-260nw-1536547337.jpg'
        message = 'A new room has been created'
      }
      const text = message;
      const notification = new Notification(username, { body: text, icon: img });

      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
          notification.close();
        }
      });
    });
  }

  async ngOnInit() {
    Notification.requestPermission();
    this.webNotification({
      id: 'test',
      viewedAt: 12,
      timestamp: 12,
      subject: 'room_added',
      payload: {user: {id: 'string', username: 'string', photoUrl: 'string'}, room: {id: 'test', name: 'hello', type: RoomType.Text}}
    });
    this.notificationSocketService.onNewNotification(async notif => {
      this.notificatStore.appendNotification(notif);
      this.webNotification(notif);
    })
    await this.notificationService.fetch()
    console.log(this.notificatStore.value.notifications);
    
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
  

}
