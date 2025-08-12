let pelaajat = [];
let nykyinenPelaaja = 0;
let vuoronPisteet = 0;
let peliKaynnissa = false;
let tavoitePisteet = 100;

let pelaajienMaaraKentta = document.getElementById("pelaajienMaara");
let luoPelaajatNappi = document.getElementById("luoPelaajat");
let pelaajienNimetDiv = document.getElementById("pelaajienNimet");
let aloitaPeliNappi = document.getElementById("aloitaPeli");

let vuorossaSpan = document.getElementById("vuorossa");
let vuoronPisteetSpan = document.getElementById("vuoronPisteet");
let noppaKuva1 = document.getElementById("noppaKuva1");
let noppaKuva2 = document.getElementById("noppaKuva2");

let heitaNoppaaNappi = document.getElementById("heitäNoppaa");
let pidaPisteetNappi = document.getElementById("pidäPisteet");
let pisteetListaDiv = document.getElementById("pisteetLista");

let perakkaisetTuplat = 0;

// Luo nimikentät pelaajille
luoPelaajatNappi.onclick = function() {
    pelaajienNimetDiv.innerHTML = "";
    let maara = Number(pelaajienMaaraKentta.value);
    for (let i = 0; i < maara; i++) {
        pelaajienNimetDiv.innerHTML += `<input type="text" placeholder="Pelaaja ${i+1}" id="pelaaja${i}"><br>`;
    }
};

// Aloita peli
aloitaPeliNappi.onclick = function() {
    pelaajat = [];
    let maara = Number(pelaajienMaaraKentta.value);
    for (let i = 0; i < maara; i++) {
        let nimiKentta = document.getElementById("pelaaja" + i);
        let nimi = nimiKentta && nimiKentta.value.trim() ? nimiKentta.value : "Pelaaja " + (i + 1);
        pelaajat.push({ nimi: nimi, pisteet: 0 });
    }
    nykyinenPelaaja = 0;
    vuoronPisteet = 0;
    perakkaisetTuplat = 0;
    peliKaynnissa = true;
    paivitaNaytto();
};

// Heitä noppaa
heitaNoppaaNappi.onclick = function() {
    if (!peliKaynnissa) return;

    let noppa1 = Math.floor(Math.random() * 6) + 1;
    let noppa2 = Math.floor(Math.random() * 6) + 1;
    noppaKuva1.src = "dice" + noppa1 + ".png";
    noppaKuva2.src = "dice" + noppa2 + ".png";

    if (noppa1 === 1 && noppa2 === 1) {
        // Kaksi ykköstä
        vuoronPisteet += 25;
        perakkaisetTuplat++;
    } else if (noppa1 === 1 || noppa2 === 1) {
        // Vain toinen noppa ykkönen -> vuoro loppuu, ei pisteitä
        vuoronPisteet = 0;
        perakkaisetTuplat = 0;
        seuraavaPelaaja();
    } else if (noppa1 === noppa2) {
        // Tuplat
        vuoronPisteet += (noppa1 + noppa2) * 2;
        perakkaisetTuplat++;
        if (perakkaisetTuplat === 3) {
            // Kolme tuplaa peräkkäin -> vuoro loppuu, ei pisteitä
            vuoronPisteet = 0;
            perakkaisetTuplat = 0;
            seuraavaPelaaja();
        }
    } else {
        // Normaali heitto
        vuoronPisteet += noppa1 + noppa2;
        perakkaisetTuplat = 0;
    }

    paivitaNaytto();
};

// Pidä pisteet
pidaPisteetNappi.onclick = function() {
    if (!peliKaynnissa) return;
    pelaajat[nykyinenPelaaja].pisteet += vuoronPisteet;
    if (pelaajat[nykyinenPelaaja].pisteet >= tavoitePisteet) {
        alert(pelaajat[nykyinenPelaaja].nimi + " voitti pelin!");
        peliKaynnissa = false;
    } else {
        seuraavaPelaaja();
    }
    paivitaNaytto();
};

// Vaihda vuoro seuraavalle
function seuraavaPelaaja() {
    vuoronPisteet = 0;
    nykyinenPelaaja++;
    if (nykyinenPelaaja >= pelaajat.length) {
        nykyinenPelaaja = 0;
    }
    perakkaisetTuplat = 0;
}

// Päivitä näkymä
function paivitaNaytto() {
    if (pelaajat.length > 0) {
        vuorossaSpan.textContent = pelaajat[nykyinenPelaaja].nimi;
    }
    vuoronPisteetSpan.textContent = vuoronPisteet;
    pisteetListaDiv.innerHTML = "";
    pelaajat.forEach(p => {
        pisteetListaDiv.innerHTML += `${p.nimi}: ${p.pisteet} pistettä<br>`;
    });
}

