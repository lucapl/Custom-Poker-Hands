export function handCard(info){
    return `<div class='hand-card' id='${info.combination}'>
        <div class='hand-card-name'>${info.name}</div>
        <ul class='hand-card-fields'>
            <li class="frequency">${info.frequency}</li>
            <li class="probability">${info.probability}%</li>
        </ul>
        </div>
    </div>`;
}