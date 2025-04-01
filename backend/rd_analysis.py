import sqlite3

def calculate_rd_maturity(monthly_deposit, rate, years):
    """
    Calculate the maturity amount for an RD using the formula:
    A = P * [(1 + r/n)^(nt) - 1] / r * (1 + r)
    Where:
        A = Maturity Amount
        P = Monthly Deposit
        r = Annual Interest Rate (in decimal)
        n = Compounded monthly (n=12)
        t = Time in years
    """
    n = 12  # Monthly compounding
    r = rate / 100 / n  # Monthly interest rate in decimal
    t = years * n  # Total number of months

    if r == 0:
        maturity_amount = monthly_deposit * t  # No interest case
    else:
        maturity_amount = monthly_deposit * ((1 + r) ** t - 1) / r * (1 + r)

    return round(maturity_amount, 2)

def get_top_banks(amount, term, db_path):
    # Connect to SQLite database
    conn = sqlite3.connect(db_path)  # Path to the SQLite database (e.g., innovate.db)
    cursor = conn.cursor()  # Create a cursor to execute SQL commands

    # Define the column for the selected term
    term_map = {
        1: "Year_1",
        3: "Year_3",
        5: "Year_5"
    }

    rate_col = term_map[term]

    # Query data from SQLite database
    query = f"SELECT Bank, {rate_col} FROM rd"
    cursor.execute(query)

    # Fetch all rows from the result
    results = cursor.fetchall()

    # Process the rows to compute maturity amounts
    response_data = []
    for row in results:
        bank = row[0]
        interest_rate = row[1]

        # Calculate maturity amount
        maturity_amount = calculate_rd_maturity(amount, interest_rate, term)

        # Append the processed data
        response_data.append({
            "Bank": bank,
            "Interest Rate (%)": interest_rate,
            "Maturity Amount": maturity_amount
        })

    # Sort data by Maturity Amount in descending order
    response_data = sorted(response_data, key=lambda x: x["Maturity Amount"], reverse=True)

    # Close the database connection
    conn.close()

    # Return the data as a list of dictionaries
    return response_data