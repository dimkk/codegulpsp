(function() {
    if (!_spBodyOnLoadCalled) {
        _spBodyOnLoadFunctions.push(pageLoad);
    } else {
        pageLoad();
    }
 
    function pageLoad() {
    var html = '<input type="text" id="message_notify" placeholder="Введите заголовок"></input><br/><br/><input placeholder="Введите текст" type="text" id="data_notify"></input><br/><br/><select id="type_notify"><option>info</option><option>error</option><option>warning</option><option>success</option></select><br/><br/><button id="show_notify" type="button">Оповестить</button>'
	
	document.getElementById('app').innerHTML = html;
	
	document.getElementById('show_notify').onclick = function(){
		var message = document.getElementById('message_notify').value;
		var data = document.getElementById('data_notify').value;
		var e = document.getElementById("type_notify");
		var notType = e.options[e.selectedIndex].text;
		writeLog(message, data, true, notType);
	};
	
	function writeLog(message, data, showNotification, notificationType) {
		var iconUrl, notiTitle;
		showNotification = showNotification || true;
		if (showNotification) {
			if (notificationType === 'info')
			{ 
				notiTitle = 'ИНФО: ' + message; 
			}
			else if (notificationType === 'error')
			{
				notiTitle = 'ОШИБКА: ' + message; 
			}
			else if (notificationType === 'warning')
			{ 
				notiTitle = 'ПРЕДУПРЕЖДЕНИЕ: ' + message; 
			}
			else if (notificationType === 'success')
			{ 
				notiTitle = 'ОК: ' + message;
			 }
		}
		var notificationData = new SPStatusNotificationData( "", STSHtmlEncode(data), iconUrl, null); 
		var notification = new SPNotification( SPNotifications.ContainerID.Status, STSHtmlEncode(notiTitle), false, null, null, notificationData); 
		notification.Show(false);
	}
	
	
    }
})();