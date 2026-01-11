export const PlacesMenuDetails = {
    india: {
        label: "India",
        abbr: "IN",
        sublocations: {
            "andhra-pradesh": { label: "Andhra Pradesh" },
            "arunachal-pradesh": { label: "Arunachal Pradesh" },
            "assam": { label: "Assam" },
            "bihar": { label: "Bihar" },
            "chhattisgarh": { label: "Chhattisgarh" },
            "goa": { label: "Goa" },
            "gujarat": { label: "Gujarat" },
            "haryana": { label: "Haryana" },
            "himachal-pradesh": { label: "Himachal Pradesh" },
            "jharkhand": { label: "Jharkhand" },
            "karnataka": { label: "Karnataka" },
            "kerala": { label: "Kerala" },
            "madhya-pradesh": { label: "Madhya Pradesh" },
            "maharashtra": { label: "Maharashtra" },
            "manipur": { label: "Manipur" },
            "meghalaya": { label: "Meghalaya" },
            "mizoram": { label: "Mizoram" },
            "nagaland": { label: "Nagaland" },
            "odisha": { label: "Odisha" },
            "punjab": { label: "Punjab" },
            "rajasthan": { label: "Rajasthan" },
            "sikkim": { label: "Sikkim" },
            "tamil-nadu": { label: "Tamil Nadu" },
            "telangana": { label: "Telangana" },
            "tripura": { label: "Tripura" },
            "uttar-pradesh": { label: "Uttar Pradesh" },
            "uttarakhand": { label: "Uttarakhand" },
            "west-bengal": { label: "West Bengal" },
            "delhi": { label: "Delhi" },
            "jammu-and-kashmir": { label: "Jammu & Kashmir" },
            "ladakh": { label: "Ladakh" },
            "chandigarh": { label: "Chandigarh" },
            "puducherry": { label: "Puducherry" },
            "dadra-and-nagar-haveli-and-daman-and-diu": { label: "Dadra & Nagar Haveli and Daman & Diu" },
            "lakshadweep": { label: "Lakshadweep" },
            "andaman-and-nicobar-islands": { label: "Andaman & Nicobar Islands" },
        },
    },
  
    asia: {
        label: "Asia",
        abbr: "AS",
        sublocations: {
            "bali": { label: "Bali" },
            "thailand": { label: "Thailand" },
            "malaysia": { label: "Malaysia" },
            "japan": { label: "Japan" },
            "singapore": { label: "Singapore" },
            "dubai": { label: "Dubai" },
            "bhutan": {label: "Bhutan" }
        },
    },
  
    europe: {
        label: "Europe",
        abbr: "EU",
        sublocations: {
            "switzerland": { label: "Switzerland" },
            "france": { label: "France" },
            "italy": { label: "Italy" },
            "germany": { label: "Germany" },
            "spain": { label: "Spain" },
            "greece": { label: "Greece" },
        },
    },
  
    africa: {
        label: "Africa",
        abbr: "AF",
        sublocations: {
            "south-africa": { label: "South Africa" },
            "egypt": { label: "Egypt" },
            "morocco": { label: "Morocco" },
        },
    },
  
    australia: {
        label: "Australia",
        abbr: "AU",
        sublocations: {
            "sydney": { label: "Sydney" },
            "melbourne": { label: "Melbourne" },
            "gold-coast": { label: "Gold Coast" },
        },
    },
  
    "north-america": {
        label: "North America",
        abbr: "NA",
        sublocations: {
            "usa": { label: "USA" },
            "canada": { label: "Canada" },
            "mexico": { label: "Mexico" },
        },
    },
  
    "south-america": {
        label: "South America",
        abbr: "SA",
        sublocations: {
            "brazil": { label: "Brazil" },
            "argentina": { label: "Argentina" },
            "chile": { label: "Chile" },
        },
    },
  
    antarctica: {
        label: "Antarctica",
        abbr: "AN",
        sublocations: {},
        },
};
  
export function findRealLocation(sublocation) {
    for (const [location, data] of Object.entries(PlacesMenuDetails)) {
        if (data.sublocations?.[sublocation]) {
            return location
        }
    }
    return null
}

export function isValidLocationPair(location, sublocation) {
    if (!location) return false
  
    const loc = PlacesMenuDetails[location]
    if (!loc) return false;
  
    if (!sublocation) return true // top-level location page is valid
  
    return loc.sublocations?.[sublocation] !== undefined
}