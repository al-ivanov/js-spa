import { Component } from '../core/component';

export class NavigationComponent extends Component {
    constructor(id) {
        super(id);

        this.tabs = [];
    }

    init() {
        this.element.addEventListener('click', tabClickHandler.bind(this));
    }

    registerTabs(tabs) {
        this.tabs = tabs;
    }
}

function tabClickHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains('tab')) {
        const tabs = this.element.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');

        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name);
        this.tabs.forEach(t => t.component.hide());
        activeTab.component.show();
    }
}