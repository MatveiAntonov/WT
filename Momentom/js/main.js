const
        time        =   document.getElementById('time'),
        greeting    =   document.getElementById('greeting'),
        name        =   document.getElementById('name'),
        aim       =   document.getElementById('focus'),
        day         =   document.getElementById('date'),
        quote        =   document.getElementById("quote"),
        quote_change  =   document.getElementById("refresh_quote"),
        bg_refresh  =   document.getElementById("img_refresh"),
        Enter       =   13;

let     
        lastName    =   "",
        lastImage   =    0,
        lastaim   =   "";
        cur_quote = Math.floor(Math.random() * 10);

function ShowTime()
{
    let
        today   =   new Date(),
        hours   =   today.getHours(),
        minutes =   today.getMinutes(),
        seconds =   today.getSeconds();

    time.innerHTML = `${AddZero(hours)}<span>:</span>${AddZero(minutes)}<span>:</span>${AddZero(seconds)}`;

    setTimeout(ShowTime, 1000);
}

function GetDate()
{
    let
        today   =   new Date(),
        month   =   today.toLocaleString('en', { month: 'long' }),
        weekday =   today.toLocaleString('en', { weekday: 'long' }),
        date    =   today.getDate();

    day.innerText =  month + ' ' + date + ', ' + weekday;
}

function AddZero(number)
{
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

function ChooseTime()
{
    let today = new Date(),
        hours = today.getHours(),
        image = "";

    if (hours < 6)
    {
        image = "url('img/night/" + GetRandomNumber(1,5) + ".jpg";
        document.body.style.backgroundImage = image;
        greeting.textContent = 'Maybe it\'s time to sleep, ';

    }
    else if (hours < 12)
    {
        image = "url('img/morning/" + GetRandomNumber(1,5) + ".jpg";
        document.body.style.backgroundImage = image;
        greeting.textContent = 'Good morning, ';
    }
    else if (hours < 18)
    {
        image = "url('img/day/" + GetRandomNumber(1,4) + ".jpg";
        document.body.style.backgroundImage = image;
        greeting.textContent = 'Good afternoon, ';

    }
    else
    {
        image = "url('img/evening/" + GetRandomNumber(1,3) + ".jpg";
        document.body.style.backgroundImage = image;
        greeting.textContent = 'Good evening, ';
    }

    setTimeout(ChooseTime, 1000 * 60 * 60);
}

function GetRandomNumber(min, max)
{
    let rand = 0;
    do {
        rand = min + Math.random() * (max + 1 - min);
    }while (rand === lastImage);
    lastImage = rand;
    return Math.floor(rand);
}

function GetName()
{
    if (localStorage.getItem('name') === null)
    {
        name.textContent = 'Enter Name';
    }
    else
    {
        name.textContent = localStorage.getItem('name');
    }
}

function GetAim()
{
    if (localStorage.getItem('aim') === null)
    {
        aim.textContent = 'Enter aim';
    }
    else
    {
        aim.textContent = localStorage.getItem('aim');
    }
}

function SetName(e)
{
    if (e.type === 'keypress')
    {
        if (e.keyCode === Enter)
        {
            if (e.target.innerText.length === 0)
            {
                name.textContent = lastName;
            }
            else
            {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
        }
    }
    else
    {
        if (e.target.innerText.length === 0)
        {
            name.textContent = lastName;
        }
        else
        {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

function SetAim(e)
{
    if (e.type === 'keypress')
    {
        if (e.keyCode === Enter)
        {
            if (e.target.innerText.length === 0)
            {
                aim.textContent = lastaim;
            }
            else
            {
                localStorage.setItem('aim', e.target.innerText);
            }
            aim.blur();
        }
    }
    else
    {
        if (e.target.innerText.length === 0)
        {
            aim.textContent = lastaim;
        }
        else
        {
            localStorage.setItem('aim', e.target.innerText);
        }
    }
}

function RememberName()
{
    lastName = name.textContent;
    name.textContent = "";
}

function RememberAim()
{
    lastaim = aim.textContent;
    aim.textContent = "";
}

async function Quote()
{
    const url = `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand`,
        res = await fetch(url),
        data = await res.json(),
        index = cur_quote % data.length;
    cur_quote++;
    quote.innerHTML = data[index].content.rendered;
}

name.addEventListener('keypress', SetName);
name.addEventListener('blur', SetName);
aim.addEventListener('keypress', SetAim);
aim.addEventListener('blur', SetAim);
name.addEventListener('click', RememberName);
aim.addEventListener('click', RememberAim);
quote_change.addEventListener("click", Quote);
bg_refresh.addEventListener("click", ChooseTime);



ShowTime();
GetDate();
ChooseTime();
GetName();
GetAim();
Quote();