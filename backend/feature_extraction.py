from urllib.parse import urlparse
import ipaddress


# ============================================
# Features used by ScamShield
# ============================================

FEATURE_NAMES = [
    "URLLength",
    "DomainLength",
    "IsDomainIP",
    "TLDLength",
    "NoOfSubDomain",
    "HasObfuscation",
    "NoOfObfuscatedChar",
    "NoOfLettersInURL",
    "NoOfDegitsInURL",
    "NoOfEqualsInURL",
    "NoOfQMarkInURL",
    "NoOfAmpersandInURL",
    "NoOfOtherSpecialCharsInURL",
    "IsHTTPS"
]


# ============================================
# Normalize URL
# ============================================

def normalize_url(url):
    """
    Normalize the URL before feature extraction.

    A leading 'www.' is removed so that:

        https://google.com
        https://www.google.com

    produce the same structural features.
    """

    url = url.strip()

    parsed = urlparse(url)

    if not parsed.hostname:
        return url

    hostname = parsed.hostname.lower()

    # Remove leading www.
    if hostname.startswith("www."):
        hostname = hostname[4:]

    # Rebuild netloc
    netloc = hostname

    # Preserve port if present
    try:
        if parsed.port:
            netloc += f":{parsed.port}"
    except ValueError:
        pass

    normalized_url = parsed._replace(
        netloc=netloc
    ).geturl()

    return normalized_url


# ============================================
# Check whether domain is an IP address
# ============================================

def is_ip_address(domain):
    try:
        ipaddress.ip_address(domain)
        return 1
    except ValueError:
        return 0


# ============================================
# Extract URL features
# ============================================

def extract_features(url):

    # Normalize URL
    url = normalize_url(url)

    parsed = urlparse(url)

    # Get hostname
    domain = parsed.hostname or ""

    # Split domain
    domain_parts = domain.split(".")

    # ----------------------------------------
    # Number of subdomains
    # ----------------------------------------
    no_of_subdomain = max(
        len(domain_parts) - 2,
        0
    )

    # ----------------------------------------
    # TLD length
    # ----------------------------------------
    if len(domain_parts) >= 2:
        tld_length = len(domain_parts[-1])
    else:
        tld_length = 0

    # ----------------------------------------
    # Feature dictionary
    # ----------------------------------------

    features = {

        # URL length
        "URLLength": len(url),

        # Domain length
        "DomainLength": len(domain),

        # IP address instead of domain
        "IsDomainIP": is_ip_address(domain),

        # TLD length
        "TLDLength": tld_length,

        # Number of subdomains
        "NoOfSubDomain": no_of_subdomain,

        # Obfuscation
        "HasObfuscation": (
            1 if "%" in url else 0
        ),

        "NoOfObfuscatedChar": url.count("%"),

        # Character statistics
        "NoOfLettersInURL": sum(
            char.isalpha()
            for char in url
        ),

        "NoOfDegitsInURL": sum(
            char.isdigit()
            for char in url
        ),

        # Query parameters
        "NoOfEqualsInURL": url.count("="),

        "NoOfQMarkInURL": url.count("?"),

        "NoOfAmpersandInURL": url.count("&"),

        # Other special characters
        "NoOfOtherSpecialCharsInURL": sum(
            not char.isalnum()
            and char not in ".-/?_=&:%"
            for char in url
        ),

        # HTTPS
        "IsHTTPS": (
            1
            if parsed.scheme.lower() == "https"
            else 0
        )
    }

    return features