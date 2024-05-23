document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const initialPartition = createPartition();
    container.appendChild(initialPartition);
    makeResizable(initialPartition);
});

function createPartition() {
    const partition = document.createElement('div');
    partition.classList.add('partition', 'partition-resizable');
    partition.style.backgroundColor = getRandomColor();

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('partition-buttons');

    const splitVerticalBtn = document.createElement('button');
    splitVerticalBtn.textContent = 'V';
    splitVerticalBtn.addEventListener('click', () => splitPartition(partition, 'vertical'));

    const splitHorizontalBtn = document.createElement('button');
    splitHorizontalBtn.textContent = 'H';
    splitHorizontalBtn.addEventListener('click', () => splitPartition(partition, 'horizontal'));

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = '-';
    removeBtn.addEventListener('click', () => removePartition(partition));

    buttonsDiv.appendChild(splitVerticalBtn);
    buttonsDiv.appendChild(splitHorizontalBtn);

    partition.appendChild(buttonsDiv);
    partition.appendChild(removeBtn);

    return partition;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function splitPartition(partition, direction) {
    const newPartition = createPartition();
    const parent = partition.parentElement;
    parent.removeChild(partition);

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flex = '1';
    container.style.flexDirection = direction === 'vertical' ? 'row' : 'column';
    container.appendChild(partition);
    container.appendChild(newPartition);

    parent.appendChild(container);

    makeResizable(partition);
    makeResizable(newPartition);
}

function removePartition(partition) {
    const parent = partition.parentElement;
    if (parent.classList.contains('partition')) {
        const grandparent = parent.parentElement;
        grandparent.replaceChild(partition === parent.firstChild ? parent.lastChild : parent.firstChild, parent);
    } else {
        parent.removeChild(partition);
    }
}

function makeResizable(element) {
    interact(element).resizable({
        edges: { left: true, right: true, bottom: true, top: true }
    }).on('resizemove', function (event) {
        let { x, y } = event.target.dataset

        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top

        Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`
        })

        Object.assign(event.target.dataset, { x, y })
    })
}
