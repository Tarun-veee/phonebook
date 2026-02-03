import requests

API_URL = "http://localhost:8000/contacts"

def test_api():
    print("Testing GET /contacts...")
    try:
        response = requests.get(API_URL)
        if response.status_code == 200:
            contacts = response.json()
            print(f"Success! Found {len(contacts)} contacts:")
            for c in contacts:
                print(c)
        else:
            print(f"Failed to get contacts. Status: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_api()
