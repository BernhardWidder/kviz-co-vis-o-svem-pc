let otazky = [
    {
        otazka: "K čemu slouží procesor (CPU)?",
        odpovedi: ["Ukládá soubory natrvalo", "Zpracovává instrukce a provádí výpočty", "Zobrazuje obraz na monitoru"],
        spravna: 1,
        vysvetleni: "CPU je mozek počítače, provádí instrukce programů."
    },
    {
        otazka: "K čemu slouží RAM?",
        odpovedi: ["Uchovává data běžících programů", "Trvale ukládá fotky a dokumenty", "Chladí počítač"],
        spravna: 0,
        vysvetleni: "RAM je rychlá dočasná paměť, po vypnutí PC se vymaže."
    },
    {
        otazka: "Která komponenta zobrazuje grafiku?",
        odpovedi: ["CPU", "Chladič", "Grafická karta"],
        spravna: 2,
        vysvetleni: "Grafická karta (GPU) počítá obraz a posílá ho do monitoru."
    },
    {
        otazka: "Co je základní deska?",
        odpovedi: ["Hlavní deska, která propojuje všechny součástky", "Kryt počítačové skříně", "Typ monitoru"],
        spravna: 0,
        vysvetleni: "Do základní desky se zapojuje CPU, RAM, grafika i disky."
    },
    {
        otazka: "K čemu slouží počítačová skříň (PC case)?",
        odpovedi: ["Zpracovává data a provádí výpočty", "Chrání součástky, drží je pohromadě a zajišťuje proudění vzduchu", "Převádí napětí ze zásuvky pro součástky"],
        spravna: 1,
        vysvetleni: "Skříň nic nepočítá, jen chrání a chladí. Napětí převádí zdroj."
    },
    {
        otazka: "Monitor zobrazuje obraz, ale počítač se výrazně zpomalil a RAM je téměř plná. Co zkusíš?",
        odpovedi: ["Vyměním monitor", "Zavřu nepotřebné programy a záložky", "Zvýším jas obrazovky"],
        spravna: 1,
        vysvetleni: "Zavřením programů se uvolní RAM a PC se zrychlí."
    },
    {
        otazka: "Co je operační systém?",
        odpovedi: ["Hardware uvnitř počítače", "Software, který řídí počítač a spouští programy", "Typ pevného disku"],
        spravna: 1,
        vysvetleni: "Operační systém (např. Windows, Linux) je software, který spravuje hardware a programy."
    },
    {
        otazka: "Které zařízení je vstupní periferie?",
        odpovedi: ["Klávesnice", "Monitor", "Reproduktory"],
        spravna: 0,
        vysvetleni: "Klávesnicí data do PC zadáváš. Monitor a reproduktory jsou výstupní."
    }
];

let index = 0;
let body = 0;
let chyby = [];
let vybrana = -1;

const startDiv = document.getElementById("start");
const kvizDiv = document.getElementById("kviz");
const vysledekDiv = document.getElementById("vysledek");
const pocitadlo = document.getElementById("pocitadlo");
const otazkaEl = document.getElementById("otazka");
const odpovediEl = document.getElementById("odpovedi");
const btnDalsi = document.getElementById("btn-dalsi");
const skoreEl = document.getElementById("skore");
const chybyEl = document.getElementById("chyby");

document.getElementById("btn-start").addEventListener("click", start);
document.getElementById("btn-znovu").addEventListener("click", start);
btnDalsi.addEventListener("click", dalsi);

function start() {
    index = 0;
    body = 0;
    chyby = [];
    startDiv.classList.add("skryte");
    vysledekDiv.classList.add("skryte");
    kvizDiv.classList.remove("skryte");
    zobrazOtazku();
}

function zobrazOtazku() {
    let o = otazky[index];
    pocitadlo.textContent = "Otázka " + (index + 1) + " / " + otazky.length;
    otazkaEl.textContent = o.otazka;
    odpovediEl.innerHTML = "";
    btnDalsi.classList.add("skryte");

    for (let i = 0; i < o.odpovedi.length; i++) {
        let tlacitko = document.createElement("button");
        tlacitko.textContent = o.odpovedi[i];
        tlacitko.className = "odpoved";
        tlacitko.addEventListener("click", function () {
            vyhodnot(i);
        });
        odpovediEl.appendChild(tlacitko);
    }
}

function vyhodnot(i) {
    vybrana = i;
    let tlacitka = odpovediEl.querySelectorAll(".odpoved");
// AI Used, Model: Claude Opus 5.5
    for (let j = 0; j < tlacitka.length; j++) {
        tlacitka[j].classList.remove("vybrana");
    }
    tlacitka[i].classList.add("vybrana");
    btnDalsi.classList.remove("skryte");
}

function dalsi() {
    let o = otazky[index];
    if (vybrana === o.spravna) {
        body++;
    } else {
        chyby.push({ otazka: o, tvoje: o.odpovedi[vybrana] });
    }

    index++;
    if (index < otazky.length) {
        zobrazOtazku();
    } else {
        konec();
    }
}

function konec() {
    kvizDiv.classList.add("skryte");
    vysledekDiv.classList.remove("skryte");
    skoreEl.textContent = "Máš " + body + " z " + otazky.length + " bodů!";
    chybyEl.innerHTML = "";

    for (let i = 0; i < chyby.length; i++) {
        let ch = chyby[i];
        let p = document.createElement("p");
        p.innerHTML = "<b>" + ch.otazka.otazka + "</b><br>" +
            "Tvoje odpověď: " + ch.tvoje + "<br>" +
            "Správně: " + ch.otazka.odpovedi[ch.otazka.spravna] + "<br>" +
            "Proč: " + ch.otazka.vysvetleni;
        chybyEl.appendChild(p);
    }
}