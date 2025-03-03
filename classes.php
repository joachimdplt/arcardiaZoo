class Role {
    int id;
    String name;
}

class Breed {
    int id;
    String name;
}

class Animal {
    int id;
    String name;
    Breed breed;
}

class VeterinaryReport {
    int id;
    User veterinarian;
    Animal animal;
    String report;
    Date createdAt;
}

class AnimalFeeding {
    int id;
    User employee;
    Animal animal;
    Date feedingDate;
}

class Habitat {
    int id;
    String name;
}

class AnimalHabitat {
    Animal animal;
    Habitat habitat;
}

class Image {
    int id;
    String url;
}

class ImageAnimal {
    Image image;
    Animal animal;
}


class Service {
    int id;
    String name;
}





