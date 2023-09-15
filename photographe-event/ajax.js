document.addEventListener('DOMContentLoaded', function() {
    const loadMoreButton = document.getElementById('load-more-button');
    let page = 1;

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            let button = this;

            const data = new URLSearchParams();
            data.append('action', 'loadmore');
            data.append('page', page);

            fetch(loadmore_params.ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            })
            .then(response => response.text())
            .then(response => {
                if (response.trim()) {
                    const latestPostsWrapper = document.querySelector('.row');
                    latestPostsWrapper.insertAdjacentHTML('beforeend', response);
                    page++;
                    button.textContent = 'More Articles';
                    if (page === max_pages_latest) {
                        button.remove();
                    }
                }
            })
            .catch(error => console.error('Error fetching data:', error));
        });
    }
});
