import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`.trim())
    }
  }

  private parseMessage(message: string): PostMessage {
    console.log('start parsing');
    console.log(message);
    // TODO rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|png|gif)/gmi;

     // TODO mp4,wmv,flv,avi|wav,wav
    const videoRegex = /\.(?:mp4|wmv|flv|avi|wav)/gmi;

     // TODO mp3,ogg,wav
    const audioRegex = /\.(?:mp3|ogg|wav)/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
      console.log('match picture');
     // TODO ajouter un attachement de type image dans attachements
     attachements.push({
       type: 'image',
       url: message
     } as MessageImageElement);
    }

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
      console.log('match video');
     // TODO ajouter un attachement de type video dans attachements
     attachements.push({
        type: 'video',
        url: message
      } as MessageVideoElement);
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
      console.log('match audio');
     // TODO ajouter un attachement de type audio dans attachements
      attachements.push({
        type: 'audio',
        url: message
      } as MessageAudioElement);
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
      console.log('match youtube');
     // TODO ajouter un attachement de type youtube dans attachements
     let mes = message.split('=');
     console.log('youtube : ' + mes[1])
      attachements.push({
        type: 'youtube',
        videoId: mes[1]
      } as MessageYoutubeElement);
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
