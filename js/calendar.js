document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    const userData = JSON.parse(localStorage.getItem(currentUser));
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({length: 12}, (_, i) => i + 8); // 8AM to 7PM
    
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    // Create header
    const headerRow = document.createElement('div');
    headerRow.className = 'calendar-row header';
    headerRow.innerHTML = '<div class="time-col"></div>' + 
        days.map(day => `<div class="day-col">${day}</div>`).join('');
    calendar.appendChild(headerRow);
    
    // Create time slots
    hours.forEach(hour => {
        const row = document.createElement('div');
        row.className = 'calendar-row';
        row.innerHTML = `<div class="time-col">${hour <= 12 ? hour : hour-12}${hour < 12 ? 'AM' : 'PM'}</div>`;
        
        days.forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'day-col time-slot';
            cell.dataset.day = day;
            cell.dataset.hour = hour;
            
            // Mark as selected if in schedule
            if (userData.schedule[day]?.includes(hour)) {
                cell.classList.add('selected');
            }
            
            cell.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
            row.appendChild(cell);
        });
        
        calendar.appendChild(row);
    });
    
    // Save schedule
    document.getElementById('saveSchedule').addEventListener('click', function() {
        const selectedSlots = document.querySelectorAll('.time-slot.selected');
        const schedule = {};
        
        days.forEach(day => {
            schedule[day] = [];
            selectedSlots.forEach(slot => {
                if (slot.dataset.day === day) {
                    schedule[day].push(parseInt(slot.dataset.hour));
                }
            });
        });
        
        userData.schedule = schedule;
        localStorage.setItem(currentUser, JSON.stringify(userData));
        alert('Schedule saved!');
    });
});