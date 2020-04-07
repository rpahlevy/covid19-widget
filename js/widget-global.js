var __target = 'covid19-info';
function initCovid19Info(target = __target) {
    __target = target
    fetchData();
}

function fetchData() {
    fetch('https://covid19.mathdro.id/api')
        .then(result => result.json())
        .then(json => appendCovid19Info(json))
}

function appendCovid19Info(json) {
    var card = `
    <link rel="stylesheet" href="css/style.css">

    <div class="covid19-info__body">
        <div class="covid19-info__wrapper" hidden>
            <div class="covid19-info__container covid19-info__total">
                <div class="covid19-info__value">?</div>
            </div>
            <div class="covid19-info__row">
                <div class="covid19-info__col">
                    <div class="covid19-info__container covid19-info__dirawat">
                        <div>DIRAWAT</div>
                        <div class="covid19-info__value">?</div>
                    </div>
                </div>
                <div class="covid19-info__col">
                    <div class="covid19-info__container covid19-info__meninggal">
                        <div>MENINGGAL</div>
                        <div class="covid19-info__value">?</div>
                    </div>
                </div>
                <div class="covid19-info__col">
                    <div class="covid19-info__container covid19-info__sembuh">
                        <div>SEMBUH</div>
                        <div class="covid19-info__value">?</div>
                    </div>
                </div>
            </div>

            <div style="margin-top: .25rem">
                <small>
                    Sumber API:
                    <strong>https://covid19.mathdro.id/api</strong>
                </small>
            </div>
        </div>
    </div>`;

    var total = json.confirmed.value;
    var meninggal = json.deaths.value;
    var sembuh = json.recovered.value;

    var dirawat = formatNumber(total - meninggal - sembuh);
    total = formatNumber(json.confirmed.value);
    meninggal = formatNumber(json.deaths.value);
    sembuh = formatNumber(json.recovered.value);

    card = createElementFromHTML(card);
    card.querySelector('.covid19-info__total > .covid19-info__value').textContent = total;
    card.querySelector('.covid19-info__meninggal > .covid19-info__value').textContent = meninggal;
    card.querySelector('.covid19-info__sembuh > .covid19-info__value').textContent = sembuh;
    card.querySelector('.covid19-info__dirawat > .covid19-info__value').textContent = dirawat;
    document.getElementById(__target).appendChild(card);

    setTimeout(() => {
        card.querySelector('.covid19-info__wrapper')
            .removeAttribute('hidden')
    }, 200);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div;
}

// https://stackoverflow.com/a/2901298/11867182
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}