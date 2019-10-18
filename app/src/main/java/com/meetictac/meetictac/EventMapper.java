package com.meetictac.meetictac;

import java.util.ArrayList;
import java.util.List;

public class EventMapper {

    public static List<EventModel> map(List<EventDTO> eventDTOList) {
        List<EventModel> eventList = new ArrayList<>();
        for (EventDTO eventDTO : eventDTOList) {
            eventList.add(map(eventDTO));
        }
        return eventList;
    }

    private static EventModel map(EventDTO eventDTO) {
        EventModel event = new EventModel();
        event.setTitre(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setLocation(eventDTO.getLocation());
        event.setDate(eventDTO.getDate());

        return event;
    }


}
