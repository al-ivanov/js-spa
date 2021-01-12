import { Component } from '../core/component';
import { apiService } from '../servises/api.service';
import { TransformService } from '../servises/transform.service';
import { renderPost } from '../templates/post.template';

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    async onShow() {
        this.loader.show();
        const data = await apiService.fetchPosts();
        const posts = TransformService.fbObjectToArray(data);
        const html = posts.map(post => renderPost(post, {withButton: true})).join(' ');
        
        this.loader.hide();
        this.element.insertAdjacentHTML('afterbegin', html);
        //this.element.innerHTML = html;
    }

    init() {
        this.element.addEventListener('click', buttonHandler.bind(this));
    }

    onHide() {
        this.element.innerHTML = '';
    }
}

function buttonHandler(event) {
    const element = event.target;
    const id = element.dataset.id;
    const title = element.dataset.title;


    if(id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const candidate = favorites.find(p => p.id === id);

        if(candidate) {
            element.textContent = 'Сохранить';
            favorites = favorites.filter(p => p.id !== id);
            element.classList.add('button-primary');
            element.classList.remove('button-danger');
        } else {
            element.textContent = 'Удалить';
            favorites.push({id, title});
            element.classList.remove('button-primary');
            element.classList.add('button-danger');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}