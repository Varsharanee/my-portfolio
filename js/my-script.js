document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        console.log(response.ok);
        if (response.ok) {
            console.log("okkk");
            document.getElementById('success-message').style.display = 'block';
            form.reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 9000);
        } else {
            alert('There was a problem with your submission. Please try again.');
        }
    }).catch(error => {
        alert('There was a problem with your submission. Please try again.');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('../json/data.json')
        .then(response => response.json())
        .then(data => {
            const portfolioContainer = document.getElementById('portfolio-container');
            data.portfolio.forEach(item => {
                const colDiv = document.createElement('div');
                colDiv.className = item.className;
                
                const anchor = document.createElement('a');
                anchor.href = item.link;
                anchor.target = '_blank'; // Open link in a new tab
                
                const portfolioThumb = document.createElement('div');
                portfolioThumb.className = 'portfolio-thumb';
                
                const img = document.createElement('img');
                img.src = item.image;
                img.className = 'img-responsive';
                img.alt = 'portfolio img';
                
                const overlay = document.createElement('div');
                overlay.className = 'portfolio-overlay';
                
                const projectName = document.createElement('h4');
                projectName.textContent = item.projectName;
                
                const technology = document.createElement('h5');
                technology.textContent = item.technology;
                
                overlay.appendChild(projectName);
                overlay.appendChild(technology);
                portfolioThumb.appendChild(img);
                portfolioThumb.appendChild(overlay);
                anchor.appendChild(portfolioThumb);
                colDiv.appendChild(anchor);
                portfolioContainer.appendChild(colDiv);
            });
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
});
