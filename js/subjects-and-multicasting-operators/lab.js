import { loadingService } from './loadingService';

const loadingOverlay = document.getElementById('loading-overlay');
const classList = loadingOverlay.classList;
const addClass = isLoading => isLoading
    ? classList.add('open')
    : classList.remove('open');

loadingService.loadingStatus$.subscribe(addClass);
setTimeout(() => loadingService.hideLoading(), 1500);
