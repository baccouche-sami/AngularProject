import { NotificationStore } from './../../notification.store';
import { NotificationState } from './../../notification.state';
import { Notification } from './../../../../../../iti-community-server/src/modules/notification/domain/Notification';
import { Component, OnInit } from '@angular/core';
import { AnyNotification } from '../../notification.model';
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

  async ngOnInit() {
    this.notificationSocketService.onNewNotification(async notif => {
      this.notificatStore.appendNotification(notif)
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
