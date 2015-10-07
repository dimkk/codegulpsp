(function() { //Изолируем 
    if (!_spBodyOnLoadCalled) { //Используем вместо $(document).ready()
        _spBodyOnLoadFunctions.push(pageLoad);
    } else {
        pageLoad();
    }
 
    function pageLoad() {
		var html =  '<input type="text" id="message_notify" placeholder="Введите заголовок"></input>'+
					'<br/><br/>'+
					'<input placeholder="Введите текст" type="text" id="data_notify"></input>'+
					'<br/><br/>'+
					'<select id="type_notify">'+
						'<option>info</option><option>error</option><option>warning</option><option>success</option>'+
					'</select>'+
					'<br/><br/>'+
					'<button id="show_notify" type="button">Оповестить</button>';
		
		document.getElementById('app').innerHTML = html; //Вставляем нужную разметку
		
		document.getElementById('show_notify').onclick = function(){ //Вешаем обработчик
			var message = document.getElementById('message_notify').value;//Собираем данные
			var data = document.getElementById('data_notify').value;
			var e = document.getElementById("type_notify");
			var notType = e.options[e.selectedIndex].text;
			writeLog(message, data, true, notType); //Выводим оповещение
		};
		function writeLog(message, data, showNotification, notificationType) {
			var title;
			if (!message) message = 'Sample title';
			if (!data) data = 'Sample data';
			showNotification = showNotification || true;
			if (showNotification) {
				if (notificationType === 'info')
				{ 
					title = 'ИНФО: ' + message; 
				}
				else if (notificationType === 'error')
				{
					title = 'ОШИБКА: ' + message; 
				}
				else if (notificationType === 'warning')
				{ 
					title = 'ПРЕДУПРЕЖДЕНИЕ: ' + message; 
				}
				else if (notificationType === 'success')
				{ 
					title = 'ОК: ' + message;
				}
			}
			var notificationData = new SPStatusNotificationData( "", STSHtmlEncode(data), "", null); 
			var notification = new SPNotification( SPNotifications.ContainerID.Status, STSHtmlEncode(title), false, null, null, notificationData); 
			notification.Show(false);
		}
    }
})();