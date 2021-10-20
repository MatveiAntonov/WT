function CreateModal(jsn)
{
    let modal_window = document.createElement('div');
    modal_window.id = "modal__window";
    modal_window.className = "modal__window";

    let mCont = document.createElement("ol");
    mCont.id = "modal_list";
    mCont.className = "modal_list";
    mCont.innerHTML = '<span class = "modal_close"> Close </span>';

    object = JSON.parse(jsn);

    for( let i = 0; i < Object.keys(object).length; i++)
    {
      let content = document.createElement('li');
      content.className = "lst";
      content.innerHTML = "Username: " + object[i].userName + "<br> Message: " + object[i].message;
      mCont.append(content);
    }
    document.body.append(mCont);

    modal_window.append(mCont);
    document.body.append(modal_window);

    let baton = document.getElementById("modal_button");
    baton.onclick = function()
    {
      document.getElementById("modal__window").style.display = "block";
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }

    document.getElementsByClassName("modal_close")[0].onclick = function() 
        {
            document.getElementById("modal__window").style.display = "none";
            document.getElementsByTagName("body")[0].style.overflow = "visible";
        }

      window.onclick = function(click) 
      {
          if (click.target == document.getElementById("modal__window")) 
          {
              document.getElementById("modal__window").style.display = "none";
              document.getElementsByTagName("body")[0].style.overflow = "visible";
          }
      }
};


function Request()
{
    let request = new XMLHttpRequest();
    request.open('GET', 'https://rpi-lab2.herokuapp.com/api/message', true);
    request.send();

    request.onload = function() 
    {
        if (request.status != 200) 
        { 
          alert(`Ошибка ${request.status}: ${request.statusText}`); 
        } else { 
          CreateModal(request.response); 
        }
      };

      request.onerror = function() {
        alert("Запрос не удался");
    }
    
};
Request();


