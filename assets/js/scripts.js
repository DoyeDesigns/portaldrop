document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("login-btn").addEventListener("click", loginUser);
  document.getElementById("withdraw-btn").addEventListener("click", withdraw);
});

(async function checkLogin() {
  const response = await fetch("https://portaldrop.io/api.php?action=check_login");

  if (response.ok) {
    const data = await response.json();

    if (data.success) {
      showUserPanel(data);
    } else {
      showLoginForm();
    }
  } else {
    alert("An error occurred. Please try again.");
  }
})();

async function loginUser() {
  const ethAddress = document.getElementById("eth-address").value;
  const referralCode = new URLSearchParams(window.location.search).get("ref");

  if (isValidEthAddress(ethAddress)) {
    const response = await fetch("https://portaldrop.io/api.php?action=login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ethAddress, referralCode }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        showUserPanel(data);
      } else {
        showLoginForm();
      }
    } else {
      alert("An error occurred. Please try again.");
    }
  } else {
    alert("Please enter a valid BEP20 address.");
  }
}

async function withdraw() {
  const response = await fetch("https://portaldrop.io/api.php?action=withdraw", { method: "POST" });

  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      document.getElementById("balance").textContent = `${Math.round(data.newBalance)} PORTAL`;
      const historyBody = document.getElementById("withdraw-history-body");
      historyBody.innerHTML = "";
      for (const withdrawRecord of data.records) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${withdrawRecord.date}</td>
          <td>${Math.round(withdrawRecord.tokens)}</td>
          <td>${withdrawRecord.eth_address.slice(0, 6)}...${withdrawRecord.eth_address.slice(-4)}</td>
          <td>${withdrawRecord.status}</td>
        `;
        historyBody.appendChild(row);
      }
    } else {
      alert("Min withdraw 700 PORTAL. Keep referring");
    }
  } else {
    alert("An error occurred. Please try again.");
  }
}


function isValidEthAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function showLoginForm() {
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("user-panel").classList.add("hidden");
}

async function showUserPanel(userData) {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("user-panel").style.display = "block";

  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${userData.referralCode}`;
  document.getElementById("referral-link").textContent = referralLink;
  document.getElementById("invited-count").textContent = `${userData.invitedCount} users`;
  document.getElementById("balance").textContent = `${Math.round(userData.balance)} PORTAL`;
  document.getElementById("eth-address-display").textContent = userData.ethAddress; // Dodaj tę linię


  const response = await fetch("https://portaldrop.io/api.php?action=getWithdrawHistory");

  if (response.ok) {
    const historyData = await response.json();
    if (historyData.success) {
      const historyBody = document.getElementById("withdraw-history-body");
      historyBody.innerHTML = "";

      for (const withdrawRecord of historyData.records) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${withdrawRecord.date}</td>
          <td><b>${withdrawRecord.tokens}</b></td>
          <td>${withdrawRecord.eth_address.slice(0, 6)}...${withdrawRecord.eth_address.slice(-4)}</td> <!-- Skrócony adres Ethereum -->
          <td><b>Reviewed,<br> distribute after presale completed</b></td>
        `;
        historyBody.appendChild(row);
      }
    } else {
      alert("Failed to fetch withdraw history. Please try again.");
    }
  } else {
    alert("An error occurred while fetching withdraw history. Please try again.");
  }
  await getTotalRewards();
}
async function getTotalRewards() {
  const response = await fetch("https://portaldrop.io/api.php?action=getTotalRewards");

  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      document.getElementById("total-rewards").textContent = `${data.totalRewards} PORTAL`;
    }
  } else {
    alert("An error occurred while fetching total rewards. Please try again.");
  }
}

async function addTokens(amount, buttonId) {
  const response = await fetch(`https://portaldrop.io/api.php?action=add_tokens&button_id=${buttonId}`, { method: "POST" });

  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      const balanceElement = document.getElementById("balance");
      const currentBalance = parseInt(balanceElement.textContent);
      balanceElement.textContent = `${currentBalance + amount} PORTAL`;

      const button = document.getElementById(buttonId);
      button.disabled = true;
      button.innerHTML = "Claimed";
    } else {
      alert("An error occurred. Please try again.");
    }
  } else {
    alert("An error occurred. Please try again.");
  }
}
async function checkClaimedButtons() {
  const response = await fetch("https://portaldrop.io/api.php?action=get_claimed_buttons");

  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      for (const buttonId of data.claimedButtons) {
        const button = document.getElementById(buttonId);
        button.disabled = true;
        button.innerHTML = "Claimed";
      }
    } else {
      alert("An error occurred. Please try again.");
    }
  } else {
    alert("An error occurred. Please try again.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  checkClaimedButtons();
});

function addClaimButton(id, tokens, link) {
  const button = document.createElement("a");
  button.href = link;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.id = `claim-button-${id}`;
  button.textContent = `Claim ${tokens} PORTAL`;
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    await claimTokens(id, tokens);
    button.disabled = true;
    button.textContent = "Claimed";
  });
  document.getElementById("claim-buttons").appendChild(button);
}
function redirectToUrl(url) {
  window.open(url, '_blank');
}

function copyReferralLink(event) {
  event.stopPropagation(); // Prevent the click event from propagating to parent elements

  const referralLinkElement = document.getElementById("referral-link");
  const referralLink = referralLinkElement.textContent;

  navigator.clipboard.writeText(referralLink)
    .then(() => {
      alert("Referral link copied to clipboard!");
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
}
