class Trip:  
    def __init__(self):  
        self.startDate = None  
        self.endDate = None  
        self.interests = []  
        self.countries = []  
        self.isSustainable = False
      
    def get_exampletrip(self):  
        return [
            {
                "name": 'Barcelona',
                "place": 'Barcelona, Spain',
                "description": 'Barcelona is a vibrant city known for its stunning architecture, rich history, and lively culture. Explore the iconic landmarks such as Sagrada Familia and Park Güell, stroll along the vibrant streets of Las Ramblas, and indulge in delicious tapas at local restaurants. Don\'t miss the opportunity to visit the Gothic Quarter and enjoy the breathtaking views from Montjuïc Hill. Barcelona offers a perfect blend of beach, city, and culture.',
                "coordinates": {
                    "longitude": 2.1734,
                    "latitude": 41.3851
                },
                "duration": '3 days',
                "activityType": 'city',
                "transport": 'flight',
                "company": 'Airline XYZ',
                "travelTips": 'Make sure to book tickets in advance for popular attractions like Sagrada Familia. Explore the local markets for unique souvenirs and try the traditional Catalan cuisine.'
            },
            {
                "name": 'Mallorca',
                "place": 'Mallorca, Spain',
                "description": 'Mallorca is a stunning island in the Mediterranean Sea known for its beautiful beaches, crystal-clear waters, and picturesque landscapes. Spend your days relaxing on the sandy shores, exploring charming coastal towns like Palma de Mallorca, and hiking through the scenic Tramuntana Mountains. Don\'t miss the opportunity to visit the historic Bellver Castle and indulge in delicious seafood at local restaurants. Mallorca offers a perfect blend of relaxation, nature, and adventure.',
                "coordinates": {
                    "longitude": 2.6502,
                    "latitude": 39.6953
                },
                "duration": '5 days',
                "activityType": 'beach',
                "transport": 'ferry',
                "company": 'Ferry Company ABC',
                "travelTips": 'Rent a car to explore the hidden gems of Mallorca. Take a boat tour to discover the stunning coastline and hidden coves. Don\'t forget to try the local delicacy, ensaimada.'
            },
            {
                "name": 'Ibiza',
                "place": 'Ibiza, Spain',
                "description": 'Ibiza is a world-famous party destination known for its vibrant nightlife, beautiful beaches, and stunning sunsets. Spend your days lounging on the sandy shores, exploring the charming old town of Dalt Vila, and dancing the night away at iconic clubs like Pacha and Amnesia. Don\'t miss the opportunity to visit the mystical Es Vedrà island and enjoy a sunset boat party. Ibiza offers a perfect blend of relaxation, partying, and natural beauty.',
                "coordinates": {
                    "longitude": 1.4356,
                    "latitude": 38.9085
                },
                "duration": '4 days',
                "activityType": 'beach',
                "transport": 'ferry',
                "company": 'Ferry Company XYZ',
                "travelTips": 'Plan your visit during the summer season to experience the vibrant nightlife. Explore the local markets for unique handmade crafts and souvenirs. Don\'t forget to try the local seafood paella.'
            },
            {
                "name": 'Madrid',
                "place": 'Madrid, Spain',
                "description": 'Madrid is the vibrant capital city of Spain known for its rich history, stunning architecture, and world-class museums. Explore the iconic landmarks such as the Royal Palace, Prado Museum, and Retiro Park. Immerse yourself in the lively atmosphere of Plaza Mayor and indulge in delicious tapas at local bars. Don\'t miss the opportunity to watch a flamenco show and visit the vibrant Mercado de San Miguel. Madrid offers a perfect blend of culture, art, and gastronomy.',
                "coordinates": {
                    "longitude": -3.7038,
                    "latitude": 40.4168
                },
                "duration": '3 days',
                "activityType": 'city',
                "transport": 'train',
                "company": 'Train Company ABC',
                "travelTips": 'Visit the local markets like El Rastro for unique souvenirs and vintage finds. Explore the vibrant neighborhoods of Malasaña and Chueca for trendy shops and bars. Don\'t forget to try the traditional Spanish dish, paella.'
            },
            {
                "name": 'Sevilla',
                "place": 'Sevilla, Spain',
                "description": 'Sevilla is a charming city in southern Spain known for its rich history, stunning architecture, and vibrant culture. Explore the iconic landmarks such as the Alcázar of Seville, Plaza de España, and Cathedral of Seville. Wander through the narrow streets of the Santa Cruz neighborhood and indulge in delicious tapas at local taverns. Don\'t miss the opportunity to watch a flamenco show and take a boat ride along the Guadalquivir River. Sevilla offers a perfect blend of history, culture, and charm.',
                "coordinates": {
                    "longitude": -5.9844,
                    "latitude": 37.3891
                },
                "duration": '4 days',
                "activityType": 'city',
                "transport": 'train',
                "company": 'Train Company XYZ',
                "travelTips": 'Visit the Real Alcázar early in the morning to avoid crowds. Explore the Triana neighborhood for traditional flamenco performances and ceramic workshops. Don\'t forget to try the local delicacy, tapas.'
            }
        ]
        
    def generate_question(self):
        question = f"Create a detailed travel itinerary starting from {self.startDate} to {self.endDate}. "

        if self.interests:
            interests_formatted = ", ".join(self.interests)
            question += f"Include activities catering to these interests: {interests_formatted}. "

        if self.countries:
            countries_formatted = ", ".join(self.countries)
            question += f"This trip should cover the following countries: {countries_formatted}. "

        if self.isSustainable:
            question += ("Ensure the itinerary emphasizes sustainability, incorporating eco-friendly activities, accommodations, "
                        "and transportation options. ")

        question += ("The response should be formatted as a JSON array where each object contains the following details: "
                    "'name' (the name of the activity or location), "
                    "'place' (the specific location of the activity), "
                    "'description' (a comprehensive description of the activity and its significance), "
                    "'coordinates' (an array with two decimal numbers representing latitude and longitude), "
                    "'duration' (the number of days the activity will take, as an integer), "
                    "'activityType' (the type of activity, e.g., Nature, Culture, Adventure), "
                    "'transport' (the main mode of transportation used to arrive at or during the activity), "
                    "'company' (the company providing the activity or transport), "
                    "'travelTips' (practical advice for those engaging in the activity). "
                    "Each entry should provide thorough descriptions and practical details, ensuring a comprehensive guide for travelers.")

        return question