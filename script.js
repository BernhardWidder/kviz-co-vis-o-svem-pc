// ===== Seznam otazek =====
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

// ===== Promenne pro prubeh hry =====
let index = 0;      // cislo aktualni otazky
let body = 0;       // pocet spravnych odpovedi
let chyby = [];     // seznam spatne zodpovezenych otazek pro vyhodnoceni na konci
let vybrana = -1;   // kterou odpoved hrac oznacil -1 = zatim zadnou

// ===== Odkazy na prvky v HTML =====
const startDiv = document.getElementById("start");          // uvodni obrazovka
const kvizDiv = document.getElementById("kviz");            // obrazovka s otazkami
const vysledekDiv = document.getElementById("vysledek");    // obrazovka s vyhodnocenim
const pocitadlo = document.getElementById("pocitadlo");     // text Otazka X / Y
const otazkaEl = document.getElementById("otazka");         // nadpis s otazkou
const odpovediEl = document.getElementById("odpovedi");     // misto pro tlacitka s odpovedmi
const btnDalsi = document.getElementById("btn-dalsi");      // tlacitko Dalsi
const skoreEl = document.getElementById("skore");           // text se skore
const chybyEl = document.getElementById("chyby");           // misto pro vypis chyb

// ===== Tlacitka =====
// Zacit test a Zkusit znovu spusti hru od zacatku
document.getElementById("btn-start").addEventListener("click", start);
document.getElementById("btn-znovu").addEventListener("click", start);
// Dalsi vyhodnoti odpoved a prejde na dalsi otazku
btnDalsi.addEventListener("click", dalsi);

// ===== start =====
// vynuluje hru / schova start a vysledek / ukaze kviz a prvni otazku
function start() {
    index = 0;
    body = 0;
    chyby = [];
    startDiv.classList.add("skryte");
    vysledekDiv.classList.add("skryte");
    kvizDiv.classList.remove("skryte");
    zobrazOtazku();
}

// ===== zobrazOtazku =====
// vypise aktualni otazku a pro kazdou odpoved vytvori tlacitko
function zobrazOtazku() {
    let o = otazky[index];
    pocitadlo.textContent = "Otázka " + (index + 1) + " / " + otazky.length;
    otazkaEl.textContent = o.otazka;
    odpovediEl.innerHTML = "";              // smaze tlacitka z minule otazky
    btnDalsi.classList.add("skryte");       // Dalsi se ukaze az po vyberu odpovedi
    vybrana = -1;

    for (let i = 0; i < o.odpovedi.length; i++) {
        let tlacitko = document.createElement("button");
        tlacitko.textContent = o.odpovedi[i];
        tlacitko.className = "odpoved";
        // po kliknuti se zavola vyhodnot s cislem teto odpovedi
        tlacitko.addEventListener("click", function () {
            vyhodnot(i);
        });
        odpovediEl.appendChild(tlacitko);
    }
}

// ===== vyhodnot =====
// zapamatuje si vybranou odpoved potom oznaci ji barvou potom ukaze tlacitko Dalsi
    function vyhodnot(i) {
    vybrana = i;
    let tlacitka = odpovediEl.querySelectorAll(".odpoved");
    // nejdriv odznaci vsechny odpovedi
    for (let j = 0; j < tlacitka.length; j++) {
        tlacitka[j].classList.remove("vybrana");
    }
    // pak oznaci tu kliknutou
    tlacitka[i].classList.add("vybrana");
    btnDalsi.classList.remove("skryte");
}

// ===== dalsi =====
// zkontroluje odpoved: spravne = bod / spatne = ulozi se do chyb
// pak ukaze dalsi otazku nebo vyhodnoceni kdyz uz zadna neni
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

// ===== konec =====
// vyhodnoceni na konci
// ukaze skore a u kazde chyby vypise otazku / tvoji odpoved / spravnou odpoved / proc
function konec() {
    kvizDiv.classList.add("skryte");
    // AI Used, Model: Claude Opus 5.5
    vysledekDiv.classList.remove("skryte");
    skoreEl.textContent = "Máš " + body + " z " + otazky.length + " bodů!";
    chybyEl.innerHTML = "";

    // pro kazdou chybu vytvori jeden odstavec
    for (let i = 0; i < chyby.length; i++) {
        let ch = chyby[i];
        let p = document.createElement("p");
        p.innerHTML = "<b>" + ch.otazka.otazka + "</b><br>" +
            "Tvoje odpověď: " + ch.tvoje + "<br>" +
            "Správně: " + ch.otazka.odpovedi[ch.otazka.spravna] + "<br>" +
            "Proč: " + ch.otazka.vysvetleni;
        chybyEl.appendChild(p);
    }

    // kdyz hrac nema zadnou chybu
    if (chyby.length === 0) {
        chybyEl.innerHTML = "<p>Všechno správně! </p>";
    }
}
